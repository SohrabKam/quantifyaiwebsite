export default function PrivacyPage() {
  return (
    <div className="container py-16 md:py-20">
      <div className="prose prose-slate max-w-3xl dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p>
          QuantifyAI respects your privacy. This policy explains what we collect
          and how we use it.
        </p>
        <h2>Information we collect</h2>
        <ul>
          <li>Contact details you submit through forms.</li>
          <li>Usage data to improve product performance.</li>
          <li>BOQ files you upload for validation.</li>
        </ul>
        <h2>How we use data</h2>
        <ul>
          <li>Provide access to the platform and support.</li>
          <li>Improve validation accuracy and reporting.</li>
          <li>Communicate product updates.</li>
        </ul>
        <h2>Data retention</h2>
        <p>
          We retain uploaded files and reports for as long as needed to provide
          the service or as required by law.
        </p>
        <h2>Contact</h2>
        <p>
          For questions, contact us at{" "}
          <a href="mailto:directors@quantifyai.uk">directors@quantifyai.uk</a>.
        </p>
      </div>
    </div>
  );
}
