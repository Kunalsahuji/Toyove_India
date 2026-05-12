import { useEffect, useState } from 'react'
import { PolicyPageLayout } from '../components/layout/PolicyPageLayout'
import { getPageContent } from '../services/pageApi'

export function PrivacyPolicy() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getPageContent('privacy-policy')
        setContent(data)
      } catch (err) {
        console.error('Failed to fetch privacy policy:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchContent()
  }, [])

  if (loading) {
    return (
      <PolicyPageLayout title="Privacy Policy" subtitle="Loading...">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-5/6" />
        </div>
      </PolicyPageLayout>
    )
  }

  // If no dynamic content found, show fallback (initial hardcoded version)
  if (!content) {
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

  return (
    <PolicyPageLayout 
      title={content.title} 
      subtitle={`Last updated: ${new Date(content.updatedAt).toLocaleDateString()}`}
    >
      <div 
        className="dynamic-content prose prose-orange max-w-none"
        dangerouslySetInnerHTML={{ __html: content.content }} 
      />
    </PolicyPageLayout>
  )
}
