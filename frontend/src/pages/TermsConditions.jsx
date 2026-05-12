import { useEffect, useState } from 'react'
import { PolicyPageLayout } from '../components/layout/PolicyPageLayout'
import { getPageContent } from '../services/pageApi'

export function TermsConditions() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getPageContent('terms-conditions')
        setContent(data)
      } catch (err) {
        console.error('Failed to fetch terms:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchContent()
  }, [])

  if (loading) {
    return (
      <PolicyPageLayout title="Terms & Conditions" subtitle="Loading...">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
        </div>
      </PolicyPageLayout>
    )
  }

  if (!content) {
    return (
      <PolicyPageLayout 
        title="Terms & Conditions" 
        subtitle="Website Usage Policy"
      >
        <section className="space-y-4">
          <h2>Website Usage</h2>
          <p>By accessing this website, you agree to comply with and be bound by the following terms and conditions of use, which together with our privacy policy govern TOYOVOINDIA's relationship with you in relation to this website.</p>
        </section>

        <section className="space-y-4">
          <h3>Intellectual Property</h3>
          <p>The content of the pages of this website is for your general information and use only. It is subject to change without notice. All trademarks reproduced in this website, which are not the property of, or licensed to the operator, are acknowledged on the website.</p>
        </section>

        <section className="space-y-4">
          <h3>Product Descriptions</h3>
          <p>TOYOVOINDIA attempts to be as accurate as possible. However, TOYOVOINDIA does not warrant that product descriptions or other content of this site is accurate, complete, reliable, current, or error-free.</p>
        </section>

        <section className="space-y-4">
          <h3>Limitation of Liability</h3>
          <p>In no event shall TOYOVOINDIA be liable for any direct, indirect, incidental, special or consequential damages arising out of or in any way connected with the use of this website.</p>
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
