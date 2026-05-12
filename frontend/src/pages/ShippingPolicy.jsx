import { useEffect, useState } from 'react'
import { PolicyPageLayout } from '../components/layout/PolicyPageLayout'
import { getPageContent } from '../services/pageApi'

export function ShippingPolicy() {
  const [content, setContent] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const data = await getPageContent('shipping-policy')
        setContent(data)
      } catch (err) {
        console.error('Failed to fetch shipping policy:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchContent()
  }, [])

  if (loading) {
    return (
      <PolicyPageLayout title="Shipping Policy" subtitle="Loading...">
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
        title="Shipping Policy" 
        subtitle="Delivery & Logistics"
      >
        <section className="space-y-4">
          <h2>Shipping Methods</h2>
          <p>We deliver all across India using trusted courier partners like BlueDart, Delhivery, and Xpressbees. We offer two main shipping options:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Standard Shipping:</strong> Reliable delivery within 3-5 business days.</li>
            <li><strong>Express Delivery:</strong> Faster service within 1-2 business days for select pin codes.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <h3>Order Processing</h3>
          <p>Orders placed before 2 PM are typically processed and handed over to our courier partners on the same business day. Orders placed on weekends or public holidays will be processed on the next working day.</p>
        </section>

        <section className="space-y-4">
          <h3>Shipping Charges</h3>
          <p>Shipping charges are calculated based on your location and the weight of the items. You can see the exact shipping cost at the checkout page before making a payment.</p>
        </section>

        <section className="space-y-4">
          <h3>Tracking Your Order</h3>
          <p>Once your order is shipped, we will send you an email and SMS with the tracking number and a link to follow your package's journey.</p>
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
