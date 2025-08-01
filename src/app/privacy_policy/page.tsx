
export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-cyan-100 to-blue-100 px-4 py-10 font-sans">
      <div className="max-w-4xl mx-auto bg-orange-50 shadow-lg rounded-xl p-8 md:p-12">
        <h1 className="text-3xl md:text-4xl font-bold text-blue-700 mb-6 text-center">
          Privacy Policy
        </h1>

        <p className="mb-6 text-gray-700 text-base md:text-lg leading-relaxed">
          At <strong>Recipe Generator</strong>, we respect your privacy and are committed to protecting any
          personal information you may provide while using our website.
        </p>

        <Section title="1. Information We Collect">
          We may collect non-personal information such as browser type, language preference, referring site,
          and the date and time of each visitor request to enhance user experience.
        </Section>

        <Section title="2. Use of Information">
          Any feedback or recipe data collected is used solely to improve the quality of our AI-generated
          content and enhance our services. We do not share your data with third parties.
        </Section>

        <Section title="3. Cookies">
          We use cookies to improve your browsing experience. You can choose to disable cookies through your
          browser settings.
        </Section>

        <Section title="4. Data Security">
          We implement industry-standard measures to protect your data but cannot guarantee absolute security.
        </Section>

        <Section title="5. Contact Us">
          If you have any questions or concerns about our privacy policy, feel free to contact us at{" "}
          <a
            href="mailto:support@recipegenerator.com"
            className="text-blue-600 underline"
          >
            support@recipegenerator.com
          </a>.
        </Section>
      </div>
    </div>
  );
}

const Section = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div className="mb-6">
    <h2 className="text-xl md:text-2xl font-semibold text-blue-600 mb-2">
      {title}
    </h2>
    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
      {children}
    </p>
  </div>
);
