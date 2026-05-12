import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PageContent from '../src/models/PageContent.js';

dotenv.config();

const INITIAL_PAGES = [
  {
    slug: 'privacy-policy',
    title: 'Privacy Policy',
    content: `
      <h2>Our Commitment to Privacy</h2>
      <p>At TOYOVOINDIA, we respect your privacy and are committed to protecting the personal information you share with us. This policy explains how we collect, use, and safeguard your data.</p>
      
      <h3>Information We Collect</h3>
      <ul>
        <li><strong>Personal Details:</strong> Name, email address, phone number, and shipping address when you make a purchase.</li>
        <li><strong>Payment Information:</strong> Securely processed through our payment gateways.</li>
        <li><strong>Browsing Data:</strong> Cookies and usage data to improve your shopping experience.</li>
      </ul>

      <h3>How We Use Your Information</h3>
      <p>We use your data primarily to process orders, provide customer support, and send you updates about new products if you opt-in.</p>
    `
  },
  {
    slug: 'terms-conditions',
    title: 'Terms & Conditions',
    content: `
      <h2>Website Usage</h2>
      <p>By accessing this website, you agree to comply with and be bound by the following terms and conditions of use.</p>
      
      <h3>Intellectual Property</h3>
      <p>All content included on this site, such as text, graphics, logos, and images, is the property of TOYOVOINDIA.</p>

      <h3>Product Descriptions</h3>
      <p>We attempt to be as accurate as possible. However, we do not warrant that product descriptions or other content is accurate, complete, reliable, or error-free.</p>
    `
  },
  {
    slug: 'shipping-policy',
    title: 'Shipping Policy',
    content: `
      <h2>Shipping Methods</h2>
      <p>We offer standard and express shipping options across India.</p>
      
      <h3>Processing Time</h3>
      <p>Orders are typically processed within 1-2 business days. You will receive a tracking number once your order has shipped.</p>

      <h3>Delivery Estimates</h3>
      <ul>
        <li><strong>Standard Shipping:</strong> 3-5 business days.</li>
        <li><strong>Express Delivery:</strong> 1-2 business days.</li>
      </ul>
    `
  },
  {
    slug: 'return-policy',
    title: 'Return & Exchange',
    content: `
      <h2>Easy Returns</h2>
      <p>We want you to be completely satisfied with your purchase. If you are not happy with your toys, you can return them within 15 days of delivery.</p>
      
      <h3>Conditions for Returns</h3>
      <ul>
        <li>Items must be in original packaging and unused condition.</li>
        <li>Proof of purchase is required.</li>
      </ul>

      <h3>Refund Process</h3>
      <p>Once we receive and inspect your return, we will process your refund within 5-7 business days to your original payment method.</p>
    `
  }
];

const seedPolicies = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding policies...');

    for (const page of INITIAL_PAGES) {
      await PageContent.findOneAndUpdate(
        { slug: page.slug },
        page,
        { upsert: true, new: true }
      );
      console.log(`Seeded/Updated: ${page.title}`);
    }

    console.log('Policy seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding policies:', error);
    process.exit(1);
  }
};

seedPolicies();
