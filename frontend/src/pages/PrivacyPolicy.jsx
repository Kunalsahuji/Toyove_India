import { PolicyPageLayout } from '../components/layout/PolicyPageLayout'

export function PrivacyPolicy() {
  return (
    <PolicyPageLayout 
      title="Privacy Policy" 
      subtitle="Your Data Security"
    >
      <section className="space-y-4">
        <h2>Our Commitment to Privacy</h2>
        <p>At TOYOVOINDIA, we respect your privacy and are committed to protecting the personal information you share with us. This policy explains how we collect, use, and safeguard your data.</p>
      </section>

      <section className="space-y-4">
        <h3>Information We Collect</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong>Personal Details:</strong> Name, email address, phone number, and shipping address when you make a purchase.</li>
          <li><strong>Payment Information:</strong> Securely processed through our payment gateways (we do not store full credit card details).</li>
          <li><strong>Browsing Data:</strong> Cookies and usage data to improve your shopping experience.</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3>How We Use Your Information</h3>
        <p>We use your data primarily to process orders, provide customer support, and, if you opt-in, send you updates about new products and special offers.</p>
      </section>

      <section className="space-y-4">
        <h3>Third-Party Sharing</h3>
        <p>We do not sell your personal information to third parties. We only share data with trusted service providers (like shipping carriers and payment processors) necessary to fulfill your orders.</p>
      </section>

      <section className="space-y-4">
        <h3>Your Rights</h3>
        <p>You have the right to access, correct, or delete your personal information at any time. Simply contact us at our support email for assistance.</p>
      </section>
    </PolicyPageLayout>
  )
}
