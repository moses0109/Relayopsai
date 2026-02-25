import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-300 py-20 px-6 md:px-8">
      <div className="max-w-3xl mx-auto">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="text-sm text-slate-500 hover:text-white mb-8 flex items-center gap-2 transition-colors"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back
        </button>

        <h1 className="text-3xl md:text-4xl font-black text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-500 mb-10">Last updated: February 2026</p>

        <div className="space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-white mb-3">Information We Collect</h2>
            <p>When you visit relayopsai.com, we may collect the following information:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-white">Information you provide:</strong> Name, email, phone number, and business details submitted through our consultation form.</li>
              <li><strong className="text-white">Device and usage data:</strong> IP address, browser type, pages visited, time on site, and referral source.</li>
              <li><strong className="text-white">Business identification:</strong> We use third-party analytics tools that may identify the company or organization associated with your visit based on publicly available business data (such as IP-to-company mapping). This is standard B2B analytics used to understand which types of businesses are interested in our services.</li>
              <li><strong className="text-white">Cookies and tracking:</strong> We use cookies and similar technologies for analytics, site performance, and to understand visitor behavior.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">How We Use Your Information</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>To provide and improve our services</li>
              <li>To respond to inquiries and process demo requests</li>
              <li>To send relevant business communications (you can opt out at any time)</li>
              <li>To analyze site traffic and understand how businesses interact with our platform</li>
              <li>To identify potential business customers who may benefit from our services</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Third-Party Services</h2>
            <p>We use the following third-party services that may collect data:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li><strong className="text-white">Vercel Analytics:</strong> Website performance and traffic analytics</li>
              <li><strong className="text-white">B2B Visitor Intelligence:</strong> Company-level identification for business analytics</li>
              <li><strong className="text-white">Email Services:</strong> For sending communications you've requested or that are relevant to your business</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Your Rights</h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Request access to the data we hold about you</li>
              <li>Request deletion of your data</li>
              <li>Opt out of any communications at any time</li>
              <li>Opt out of tracking by using browser privacy settings or ad blockers</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Data Security</h2>
            <p>We implement appropriate technical and organizational measures to protect your data, in compliance with the New York SHIELD Act and applicable federal regulations.</p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-white mb-3">Contact</h2>
            <p>For privacy-related inquiries, contact us at <a href="mailto:hello@relayopsai.com" className="text-sky-400 hover:text-sky-300 underline">hello@relayopsai.com</a>.</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
