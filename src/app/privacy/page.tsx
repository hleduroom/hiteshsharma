"use client";

import { Section } from "@/components/sections/section";

export default function PrivacyPolicy() {
  return (
    <Section id="privacy-policy" className="container mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

      <p className="mb-4">
        At <strong>hiteshsharma.com.np</strong>, your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information while using our website and services.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Personal details like name, email, or contact number when you contact us or register for services.</li>
        <li>Usage data such as IP address, pages visited, and time spent on the website.</li>
        <li>Cookies and analytics data for website performance and improvement.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>To provide our services and improve website functionality.</li>
        <li>To respond to inquiries and provide support.</li>
        <li>To send updates, course information, or promotional content.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Data Protection</h2>
      <p className="mb-4">
        We use reasonable security measures to protect your data. However, no online transmission can be 100% secure.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Third-Party Links</h2>
      <p className="mb-4">
        Our website may contain links to external sites. We are not responsible for their privacy practices.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Your Rights</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Request access or deletion of your personal data.</li>
        <li>Opt out of marketing emails or newsletters.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact</h2>
      <p>
        Email: <a href="mailto:support@hiteshsharma.com.np" className="text-primary underline">support@hiteshsharma.com.np</a><br />
        Phone: +977-9827728726
      </p>
    </Section>
  );
}