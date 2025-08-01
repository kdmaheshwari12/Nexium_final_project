export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-blue-100 px-4 py-10 font-sans">
      <div className="max-w-4xl mx-auto bg-orange-50 shadow-lg rounded-xl p-8 md:p-12 ">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6 text-center">
          Terms of Service
        </h1>

        <p className="mb-6 text-gray-700 text-base md:text-lg leading-relaxed">
          These Terms of Service ("Terms") govern your access to and use of the Recipe Generator website or
          application ("Service"). By accessing or using the Service, you agree to be bound by these Terms.
        </p>

        <Section title="1. Use of the Service">
          The Recipe Generator is provided for informational and entertainment purposes only. You may generate,
          view, and save recipes using our AI system. You agree not to misuse the Service or harm its functionality.
        </Section>

        <Section title="2. User Content">
          If you submit feedback or recipe ideas, you grant us a non-exclusive, royalty-free license to use that
          content to improve the Service. We do not claim ownership of your original submissions.
        </Section>

        <Section title="3. No Warranty">
          The Service is provided “as is” and “as available.” We do not guarantee the accuracy, nutritional value,
          or safety of generated recipes. Always use discretion and consult a professional if needed.
        </Section>

        <Section title="4. Limitation of Liability">
          We are not liable for any issues arising from the use of the Service, including but not limited to errors
          in recipes, health reactions, or site unavailability.
        </Section>

        <Section title="5. Changes to Terms">
          We may update these Terms at any time. Continued use of the Service after changes implies acceptance of the
          revised Terms.
        </Section>

        <Section title="6. Governing Law">
          These Terms shall be governed by the laws of your jurisdiction. Legal disputes shall be handled in local courts.
        </Section>

        <p className="mt-8 text-sm text-gray-600 text-center">
          If you have any questions about these Terms, contact us at{" "}
          <a href="mailto:support@recipegenerator.com" className="text-blue-600 underline">
            support@recipegenerator.com
          </a>.
        </p>
      </div>
    </div>
  );
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-6">
    <h2 className="text-xl md:text-2xl font-semibold text-blue-600 mb-2">{title}</h2>
    <p className="text-gray-700 text-base md:text-lg leading-relaxed">{children}</p>
  </div>
);
