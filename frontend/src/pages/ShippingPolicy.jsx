import { PolicyPageLayout } from '../components/layout/PolicyPageLayout'

export function ShippingPolicy() {
  return (
    <PolicyPageLayout 
      title="Shipping Policy" 
      subtitle="Fast & Safe Delivery"
    >
      <section className="space-y-4">
        <h2>Shipping Methods & Delivery Times</h2>
        <p>We strive to get your toys to your doorstep as quickly as possible. All orders are processed within 1-2 business days.</p>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-[#F9EAD3]">
              <tr>
                <th className="border p-4 text-left font-sans text-gray-800">Shipping Method</th>
                <th className="border p-4 text-left font-sans text-gray-800">Estimated Delivery</th>
                <th className="border p-4 text-left font-sans text-gray-800">Cost</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border p-4">Standard Shipping</td>
                <td className="border p-4">3-5 Business Days</td>
                <td className="border p-4">₹99 (Free over ₹999)</td>
              </tr>
              <tr>
                <td className="border p-4">Express Shipping</td>
                <td className="border p-4">1-2 Business Days</td>
                <td className="border p-4">₹249</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="space-y-4">
        <h3>Tracking Your Order</h3>
        <p>Once your order has shipped, you will receive an email confirmation with a tracking number. You can use this number on our carrier's website to monitor your package's journey.</p>
      </section>

      <section className="space-y-4">
        <h3>International Shipping</h3>
        <p>Currently, TOYOVOINDIA primarily ships within India. For international inquiries, please contact our support team to discuss special arrangements and shipping quotes.</p>
      </section>

      <section className="space-y-4">
        <h3>Damaged Items in Transit</h3>
        <p>In the unlikely event that an item arrives damaged, please take photos of the packaging and the product and contact us immediately. We will arrange for a replacement or refund as quickly as possible.</p>
      </section>
    </PolicyPageLayout>
  )
}
