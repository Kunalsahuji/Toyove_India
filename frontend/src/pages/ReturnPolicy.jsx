import { useEffect, useState } from 'react'
import { PolicyPageLayout } from '../components/layout/PolicyPageLayout'
import { getPageContent } from '../services/pageApi'

export function ReturnPolicy() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getPageContent('return-policy')
        setContent(data)
      } catch (err) {
        console.error('Failed to fetch return policy:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchContent()
  }, [])

  if (loading) {
    return (
      <PolicyPageLayout title="Return & Exchange" subtitle="Loading...">
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
        title="Return & Exchange" 
        subtitle="Hassle-free Satisfaction"
      >
        <section className="space-y-4">
          <h2>Our Return Policy</h2>
          <p>We want you and your little ones to love our toys! If you are not satisfied with your purchase, you can return the items within 15 days of delivery for a full refund or exchange.</p>
        </section>

        <section className="space-y-4">
          <h3>Eligibility for Returns</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>The item must be unused and in the same condition that you received it.</li>
            <li>It must be in the original packaging with all tags and labels intact.</li>
            <li>Proof of purchase (order number or invoice) is required.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3>Non-Returnable Items</h3>
          <p>Due to hygiene and safety reasons, certain items like teething toys or open-box plushies cannot be returned unless they are defective.</p>
        </section>

        <section className="space-y-4">
          <h3>Refund Process</h3>
          <p>Once we receive and inspect your return, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed to your original payment method within 5-7 business days.</p>
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
