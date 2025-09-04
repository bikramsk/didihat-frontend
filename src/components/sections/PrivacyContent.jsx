import React from 'react';
import { Shield, Eye, Lock, Users, Mail, Phone } from 'lucide-react';

const PrivacyContent = () => {
  const sections = [
    {
      icon: Shield,
      title: "Information We Collect",
      content: [
        "Personal Information: Name, email address, phone number, and address when you create an account or make a booking.",
        "Payment Information: Credit card details and billing information for processing transactions (securely handled by our payment processors).",
        "Usage Data: Information about how you use our website, including pages visited, time spent, and interactions.",
        "Device Information: IP address, browser type, operating system, and device identifiers.",
        "Location Data: With your permission, we may collect location information to provide location-based services."
      ]
    },
    {
      icon: Eye,
      title: "How We Use Your Information",
      content: [
        "To provide and maintain our travel booking services",
        "To process your bookings and manage your account",
        "To communicate with you about your bookings and our services",
        "To send you marketing communications (with your consent)",
        "To improve our website and services based on your usage patterns",
        "To comply with legal obligations and protect against fraud"
      ]
    },
    {
      icon: Lock,
      title: "Information Security",
      content: [
        "We implement industry-standard security measures to protect your personal information.",
        "All sensitive data is encrypted during transmission using SSL/TLS protocols.",
        "Payment information is processed through PCI-compliant payment processors.",
        "We regularly update our security practices and conduct security audits.",
        "Access to personal information is restricted to authorized personnel only."
      ]
    },
    {
      icon: Users,
      title: "Information Sharing",
      content: [
        "We do not sell, trade, or rent your personal information to third parties.",
        "We may share information with trusted service providers who assist in our operations.",
        "Information may be shared with hotels, tour operators, and other travel service providers to fulfill your bookings.",
        "We may disclose information when required by law or to protect our rights and safety.",
        "In case of business transfer, your information may be transferred to the new entity."
      ]
    },
    {
      icon: Mail,
      title: "Your Rights",
      content: [
        "Access: You can request access to your personal information we hold.",
        "Correction: You can request correction of inaccurate or incomplete information.",
        "Deletion: You can request deletion of your personal information, subject to legal requirements.",
        "Portability: You can request a copy of your data in a structured, machine-readable format.",
        "Opt-out: You can unsubscribe from marketing communications at any time."
      ]
    },
    {
      icon: Phone,
      title: "Contact Us",
      content: [
        "If you have any questions about this Privacy Policy, please contact us:",
        "Email: privacy@didihat.com",
        "Phone: +91 9410116800",
        "Address: Uttarakhand, India",
        "We will respond to your inquiries within 30 days."
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
            <h3 className="text-xl font-semibold mb-2">Questions About Our Privacy Policy?</h3>
            <p className="mb-4">We're here to help. Contact our privacy team for any concerns or questions.</p>
            <a
              href="mailto:contact@didihat.com"
              className="inline-flex items-center px-6 py-3 bg-white text-[#003B95] rounded-lg hover:bg-gray-100 transition-colors font-medium"
            >
              Contact Privacy Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PrivacyContent;