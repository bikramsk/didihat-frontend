import React from 'react';
import { FileText, Users, CreditCard, AlertTriangle, RefreshCw, Scale } from 'lucide-react';

const TermsContent = () => {
  const sections = [
    {
      icon: FileText,
      title: "Acceptance of Terms",
      content: [
        "By accessing and using DIDIHAT's website and services, you accept and agree to be bound by these Terms and Conditions.",
        "If you do not agree to these terms, please do not use our services.",
        "We reserve the right to modify these terms at any time. Continued use of our services constitutes acceptance of any changes.",
        "These terms apply to all users of our website, including browsers, customers, and contributors."
      ]
    },
    {
      icon: Users,
      title: "User Accounts",
      content: [
        "You must create an account to access certain features of our services.",
        "You are responsible for maintaining the confidentiality of your account credentials.",
        "You must provide accurate and complete information when creating your account.",
        "You are responsible for all activities that occur under your account.",
        "We reserve the right to suspend or terminate accounts that violate these terms."
      ]
    },
    {
      icon: CreditCard,
      title: "Booking and Payment",
      content: [
        "All bookings are subject to availability and confirmation by the service provider.",
        "Prices are displayed in Indian Rupees (INR) and include applicable taxes unless stated otherwise.",
        "Payment must be made in full at the time of booking unless otherwise specified.",
        "We accept major credit cards, debit cards, and other payment methods as displayed.",
        "Booking confirmations will be sent to your registered email address."
      ]
    },
    {
      icon: RefreshCw,
      title: "Cancellation and Refunds",
      content: [
        "Cancellation policies vary by service provider and are clearly stated at the time of booking.",
        "Refunds, if applicable, will be processed according to the specific cancellation policy.",
        "Processing time for refunds may take 5-10 business days depending on your payment method.",
        "Cancellation fees may apply as per the terms of the specific booking.",
        "Force majeure events may affect standard cancellation policies."
      ]
    },
    {
      icon: AlertTriangle,
      title: "Limitation of Liability",
      content: [
        "DIDIHAT acts as an intermediary between customers and service providers.",
        "We are not liable for the quality, safety, or legality of services provided by third parties.",
        "Our liability is limited to the amount paid for the specific booking in question.",
        "We are not responsible for delays, cancellations, or changes made by service providers.",
        "Travel insurance is recommended to protect against unforeseen circumstances."
      ]
    },
    {
      icon: Scale,
      title: "Governing Law",
      content: [
        "These terms are governed by the laws of India.",
        "Any disputes arising from these terms will be subject to the jurisdiction of Indian courts.",
        "We will attempt to resolve disputes through negotiation before pursuing legal action.",
        "If any provision of these terms is found invalid, the remaining provisions remain in effect.",
        "These terms constitute the entire agreement between you and DIDIHAT."
      ]
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-12">
            {sections.map((section, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-[#003B95] rounded-lg flex items-center justify-center">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>
                <div className="space-y-4">
                  {section.content.map((item, itemIndex) => (
                    <p key={itemIndex} className="text-gray-700 leading-relaxed">
                      {item}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-[#003B95] rounded-xl text-white text-center">
            <h3 className="text-xl font-semibold mb-2">Questions About Our Terms?</h3>
            <p className="mb-4">Need clarification on any of these terms? Our legal team is here to help.</p>
            <a
              href="mailto:contact@didihat.com"
              className="inline-flex items-center px-6 py-3 bg-white text-[#003B95] rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Contact Legal Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TermsContent;