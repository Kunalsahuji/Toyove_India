import { PolicyPageLayout } from '../components/layout/PolicyPageLayout'

export function TermsConditions() {
  return (
    <PolicyPageLayout 
      title="Terms & Conditions" 
      subtitle="The Fine Print"
    >
      <section className="space-y-4">
        <h2>Agreement to Terms</h2>
        <p>By accessing or using the TOYOVOINDIA website, you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, please do not use our site.</p>
      </section>

      <section className="space-y-4">
        <h3>Intellectual Property</h3>
        <p>All content on this site, including text, graphics, logos, and images, is the property of TOYOVOINDIA and is protected by copyright and other intellectual property laws.</p>
      </section>

      <section className="space-y-4">
        <h3>Product Accuracy</h3>
        <p>While we strive for 100% accuracy, we cannot guarantee that product descriptions, colors, or other content on the site are completely error-free. We reserve the right to correct any errors and to change information at any time without prior notice.</p>
      </section>

      <section className="space-y-4">
        <h3>User Accounts</h3>
        <p>If you create an account on our site, you are responsible for maintaining the confidentiality of your account information and password. You agree to accept responsibility for all activities that occur under your account.</p>
      </section>

      <section className="space-y-4">
        <h3>Limitation of Liability</h3>
        <p>TOYOVOINDIA shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our products or services.</p>
      </section>
    </PolicyPageLayout>
  )
}
