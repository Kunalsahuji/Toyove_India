import { PolicyPageLayout } from '../components/layout/PolicyPageLayout'

export function ReturnPolicy() {
  return (
    <PolicyPageLayout 
      title="Return & Exchange" 
      subtitle="Customer Satisfaction Guaranteed"
    >
      <section className="space-y-4">
        <h2>Our Return Policy</h2>
        <p>At TOYOVOINDIA, we want you and your little ones to be completely happy with your purchase. If for any reason you are not satisfied, we offer a straightforward return and exchange process.</p>
        <p>You have <strong>30 days</strong> from the date of delivery to initiate a return or exchange for most items in their original, unused condition with all packaging intact.</p>
      </section>

      <section className="space-y-4">
        <h3>How to Start a Return</h3>
        <p>1. Contact our support team at <a href="mailto:admin@gmail.com" className="text-[#E84949] underline uppercase font-bold text-[12px]">admin@gmail.com</a> with your order number.</p>
        <p>2. Our team will provide you with a Return Merchandise Authorization (RMA) number and the return shipping address.</p>
        <p>3. Pack the items securely and include the RMA number inside the package.</p>
      </section>

      <section className="space-y-4">
        <h3>Non-Returnable Items</h3>
        <ul className="list-disc pl-6 space-y-2">
          <li>Personalized or custom-made toys</li>
          <li>Items marked as "Final Sale"</li>
          <li>Opened craft kits or consumable items (like stickers or clay)</li>
          <li>Gift cards</li>
        </ul>
      </section>

      <section className="space-y-4">
        <h3>Refund Process</h3>
        <p>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed, and a credit will automatically be applied to your original method of payment within 7-10 business days.</p>
      </section>
    </PolicyPageLayout>
  )
}
