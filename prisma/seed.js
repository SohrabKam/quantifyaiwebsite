const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const adminEmail = "admin@nametbd.com";
  const passwordHash = await bcrypt.hash("Admin123!", 10);

  const admin = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      name: "Admin User",
      role: "ADMIN",
      passwordHash,
    },
  });

  const existingWaitlist = await prisma.waitlistSubmission.count();
  if (existingWaitlist === 0) {
    await prisma.waitlistSubmission.createMany({
      data: [
        {
          source: "EARLY_ACCESS",
          name: "Riley Patel",
          email: "riley@anchorbuild.com",
          company: "Anchor Build Co",
          role: "Senior Estimator",
          companySize: "201-500",
          painPoint: "Manual BOQ validation takes too long",
          details: "Reviewing BOQs across three projects each month.",
        },
        {
          source: "EARLY_ACCESS",
          name: "Jordan Lee",
          email: "jordan@civicworks.com",
          company: "CivicWorks",
          role: "Commercial Manager",
          companySize: "500+",
          painPoint: "Low confidence in budget accuracy",
          details: "Need stronger audit trails for sign-off.",
        },
        {
          source: "CONTACT",
          name: "Alex Morgan",
          email: "alex@northpointbuild.com",
          company: "Northpoint Build",
          role: "Contact",
          companySize: "Unknown",
          painPoint: "General inquiry",
          details: "Interested in integrations with our ERP.",
        },
      ],
    });
  }

  const existingUpload = await prisma.upload.findFirst({
    where: { userId: admin.id },
  });

  if (!existingUpload) {
    const upload = await prisma.upload.create({
      data: {
        fileName: "Sample-BOQ.csv",
        fileType: "csv",
        path: "uploads/sample-boq.csv",
        userId: admin.id,
      },
    });

    await prisma.report.create({
      data: {
        uploadId: upload.id,
        summaryJson: {
          totalCost: 1285000,
          missingRatesCount: 2,
          outliersCount: 1,
          topCostDrivers: [
            {
              description: "Concrete slab",
              total: 420000,
              rate: 350,
              quantity: 1200,
            },
            {
              description: "Structural steel",
              total: 310000,
              rate: 620,
              quantity: 500,
            },
          ],
        },
        rows: {
          create: [
            {
              rowJson: {
                description: "Concrete slab",
                category: "Concrete",
                quantity: 1200,
                rate: 350,
                total: 420000,
              },
              flagsJson: {
                missingRate: false,
                outlier: false,
                medianRate: 330,
              },
            },
            {
              rowJson: {
                description: "Structural steel",
                category: "Steel",
                quantity: 500,
                rate: 620,
                total: 310000,
              },
              flagsJson: {
                missingRate: false,
                outlier: true,
                medianRate: 410,
              },
            },
            {
              rowJson: {
                description: "Floor finishes",
                category: "Finishes",
                quantity: 2500,
                rate: 0,
                total: 0,
              },
              flagsJson: {
                missingRate: true,
                outlier: false,
                medianRate: 0,
              },
            },
          ],
        },
      },
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
