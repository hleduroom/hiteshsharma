"use client";

import { Section } from "@/components/sections/section";

export default function Terms() {
  return (
    <Section id="terms" className="container mx-auto py-20 px-4">
      <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

      <p className="mb-4">
        Welcome to <strong>hiteshsharma.com.np</strong>. By accessing or using this website, you agree to the following terms and conditions.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Use of Services</h2>
      <p className="mb-4">
        You may use this website and its services only for lawful purposes and in accordance with these terms.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Account Registration</h2>
      <ul className="list-disc pl-6 mb-4">
        <li>Creating an account may be required for certain courses or features.</li>
        <li>You are responsible for maintaining account confidentiality.</li>
        <li>All activity under your account is your responsibility.</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Payments & Refunds</h2>
      <p className="mb-4">
        Payments for courses are processed securely. Refunds are governed by the policy mentioned during checkout.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Intellectual Property</h2>
      <p className="mb-4">
        All content including text, images, videos, and course material is owned by Hitesh Sharma and protected by copyright.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
      <p className="mb-4">
        We are not responsible for any damages arising from your use of the website or courses.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Governing Law</h2>
      <p className="mb-4">
        These terms are governed by the laws of Nepal.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-4">Contact</h2>
      <p>
        Email: <a href="mailto:support@hiteshsharma.com.np" className="text-primary underline">support@hiteshsharma.com.np</a><br />
        Phone: +977-9827728726
      </p>
    </Section>
  );
}