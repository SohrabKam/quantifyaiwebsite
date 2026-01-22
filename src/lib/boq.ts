import { z } from "zod";
import Papa from "papaparse";
import * as XLSX from "xlsx";

export type NormalizedRow = {
  index: number;
  description: string;
  category: string | null;
  quantity: number;
  rate: number;
  unit: string | null;
  total: number;
  raw: Record<string, unknown>;
};

const numberParser = (value: unknown) => {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const normalized = value.replace(/[$,]/g, "").trim();
    const parsed = Number.parseFloat(normalized);
    return Number.isFinite(parsed) ? parsed : 0;
  }
  return 0;
};

const stringParser = (value: unknown) => {
  if (typeof value === "string") return value.trim();
  if (value == null) return "";
  return String(value);
};

const findKey = (row: Record<string, unknown>, patterns: string[]) => {
  const entries = Object.keys(row);
  const lowered = entries.map((key) => key.toLowerCase());
  const matchIndex = lowered.findIndex((key) =>
    patterns.some((pattern) => key.includes(pattern))
  );
  return matchIndex >= 0 ? entries[matchIndex] : null;
};

const inferRow = (row: Record<string, unknown>, index: number): NormalizedRow => {
  const descriptionKey = findKey(row, ["description", "item", "scope", "work"]);
  const categoryKey = findKey(row, ["category", "trade", "section", "discipline"]);
  const qtyKey = findKey(row, ["qty", "quantity", "amount", "volume"]);
  const rateKey = findKey(row, ["rate", "unit rate", "price", "unit cost"]);
  const unitKey = findKey(row, ["unit", "uom"]);

  const description = stringParser(
    descriptionKey ? row[descriptionKey] : row[Object.keys(row)[0]]
  );
  const category = categoryKey ? stringParser(row[categoryKey]) : null;
  const quantity = numberParser(qtyKey ? row[qtyKey] : 1) || 1;
  const rate = numberParser(rateKey ? row[rateKey] : 0);
  const unit = unitKey ? stringParser(row[unitKey]) : null;
  const total = rate * quantity;

  return {
    index,
    description: description || `Line item ${index + 1}`,
    category: category || null,
    quantity,
    rate,
    unit: unit || null,
    total,
    raw: row,
  };
};

const median = (values: number[]) => {
  if (values.length === 0) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  }
  return sorted[mid];
};

export const parseBoqFile = async (
  fileName: string,
  buffer: Buffer
): Promise<NormalizedRow[]> => {
  if (fileName.toLowerCase().endsWith(".csv")) {
    const parsed = Papa.parse<Record<string, unknown>>(buffer.toString("utf-8"), {
      header: true,
      skipEmptyLines: true,
    });
    return parsed.data.map((row, index) => inferRow(row, index));
  }

  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet, {
    defval: "",
  });
  return rows.map((row, index) => inferRow(row, index));
};

export const validateBoqRows = (rows: NormalizedRow[]) => {
  const groupedRates = new Map<string, number[]>();

  rows.forEach((row) => {
    const key = row.category
      ? row.category.toLowerCase()
      : row.description.split(" ")[0]?.toLowerCase() || "general";
    const rates = groupedRates.get(key) ?? [];
    if (row.rate > 0) {
      rates.push(row.rate);
      groupedRates.set(key, rates);
    }
  });

  const medians = new Map<string, number>();
  groupedRates.forEach((rates, key) => {
    medians.set(key, median(rates));
  });

  const flaggedRows = rows.map((row) => {
    const key = row.category
      ? row.category.toLowerCase()
      : row.description.split(" ")[0]?.toLowerCase() || "general";
    const medianRate = medians.get(key) ?? 0;
    const missingRate = row.rate <= 0;
    const outlier =
      !missingRate &&
      medianRate > 0 &&
      (row.rate > medianRate * 1.5 || row.rate < medianRate * 0.5);

    return {
      row,
      flags: {
        missingRate,
        outlier,
        medianRate,
        groupKey: key,
      },
    };
  });

  const totalCost = flaggedRows.reduce((sum, item) => sum + item.row.total, 0);
  const missingRatesCount = flaggedRows.filter((item) => item.flags.missingRate)
    .length;
  const outliersCount = flaggedRows.filter((item) => item.flags.outlier).length;

  const topCostDrivers = [...flaggedRows]
    .sort((a, b) => b.row.total - a.row.total)
    .slice(0, 10)
    .map((item) => ({
      description: item.row.description,
      total: item.row.total,
      rate: item.row.rate,
      quantity: item.row.quantity,
    }));

  return {
    summary: {
      totalCost,
      missingRatesCount,
      outliersCount,
      topCostDrivers,
    },
    rows: flaggedRows,
  };
};

export const uploadSchema = z.object({
  file: z
    .custom<File>()
    .refine((file) => file && file.size > 0, "Please upload a BOQ file.")
    .refine(
      (file) =>
        file &&
        [".csv", ".xlsx"].some((ext) =>
          file.name.toLowerCase().endsWith(ext)
        ),
      "Only CSV or XLSX files are supported."
    ),
});
