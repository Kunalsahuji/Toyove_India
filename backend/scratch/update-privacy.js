import mongoose from 'mongoose';
import dotenv from 'dotenv';
import PageContent from '../src/models/PageContent.js';

dotenv.config();

const newPrivacyContent = `
<h2>Toyove India Privacy Notice</h2>

<h3>1. Who we are</h3>
<p>Toyove India Limited, a private limited company incorporated under the laws of India ("Toyove India", "we", "us", "our") is the controller for the purpose of this privacy notice.</p>

<h3>2. Who does this notice apply to?</h3>
<p>Our website <a href="https://toyoveindia.com/">https://toyoveindia.com/</a> is intended for use by adults who wish to learn about our products and services (each a “Toyove App”). Any feature of the website that permits the input of personal data, for example by subscribing to newsletters or other publications, are only intended for use by an adult.</p>

<p>Each Toyove App is intended for use by children under adult supervision. We do not knowingly process children’s personal data. Toyove Apps provide numerous activities and features for children that do not require the processing of personal data.</p>

<h3>3. Types of personal data we process</h3>
<p>“Personal data” means information about an individual from which that person can be identified. It does not include information where an individual’s identity has been removed (anonymous data).</p>

<p>Typically, we process the following kinds of personal data when you use our website:</p>
<ul>
  <li><strong>Identity and Contact Data:</strong> Includes your name, email address, country of residence, and any personal data provided when contacting us.</li>
  <li><strong>Technical Data:</strong> IP address, browser type, location, operating system, and other technology on the devices you use.</li>
  <li><strong>Usage Data:</strong> Information about how you use our website, services viewed, and interaction info.</li>
  <li><strong>Marketing Data:</strong> Your preferences in receiving newsletters and marketing communications.</li>
</ul>

<h3>4. How your personal data is received</h3>
<p>We receive your data through direct interactions (forms, feedback, email) and automated technologies (cookies, tracking codes). We may also receive data from third parties like Google Analytics and Mailchimp.</p>

<h3>5. How we use your personal data</h3>
<p>We use your data to manage feedback, provide customer support, respond to queries, administer and protect our business, and optimize our website experience.</p>

<h3>6. Disclosure of your personal data</h3>
<p>We may share data with service providers (IT support, analytics, hosting) and government authorities when required by law.</p>

<h3>7. Data retention</h3>
<p>We retain your personal data for as long as you continue to have an account or as required to meet legal requirements.</p>

<h3>8. Your legal rights</h3>
<p>Under certain circumstances, you have the right to access, correction, erasure, objection, restriction, and data portability of your personal information.</p>

<p><em>Last updated: May 2026</em></p>
`;

async function seedPrivacy() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    const result = await PageContent.findOneAndUpdate(
      { slug: 'privacy-policy' },
      { 
        title: 'Privacy Policy',
        content: newPrivacyContent
      },
      { upsert: true, new: true }
    );

    console.log('Privacy Policy updated successfully:', result.slug);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding privacy policy:', error);
    process.exit(1);
  }
}

seedPrivacy();
