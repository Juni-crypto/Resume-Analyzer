import React from 'react';
import { HelpCircle } from 'lucide-react';

export function BlogFAQ() {
  const faqs = [
    {
      question: "What types of companies use ATS?",
      answer: "ATS is widely used by companies of all sizes, from small businesses to large enterprises, across various industries."
    },
    {
      question: "Can ATS be used for internal hiring?",
      answer: "Yes, many ATS platforms are designed to handle both external and internal hiring processes."
    },
    {
      question: "Is ATS suitable for small businesses?",
      answer: "Absolutely. There are ATS solutions tailored specifically for small businesses, offering scalability and cost-effectiveness."
    }
  ];

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
        <HelpCircle className="w-6 h-6 text-blue-600" />
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-blue-50/50 rounded-xl p-6">
            <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
            <p className="text-gray-700">{faq.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}