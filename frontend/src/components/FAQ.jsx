import React, { useState } from 'react';

const faqs = [
  {
    question: 'How do I book a tour?',
    answer: 'You can book a tour by visiting the Tours page and selecting your preferred package. Follow the checkout process to complete your booking.',
  },
  {
    question: 'What is the cancellation policy?',
    answer: 'You can cancel your booking up to 48 hours before the tour for a full refund. Cancellations within 48 hours may incur a fee.',
  },
  {
    question: 'Are meals included in the tour packages?',
    answer: 'Some tour packages include meals. Please check the details of each tour for more information.',
  },
  {
    question: 'Is transportation provided?',
    answer: 'Transportation options vary depending on the tour. Please refer to the specific tour description for details.',
  },
];

function FAQ() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white py-12 px-5">
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl font-bold text-blue-800 mb-8 text-center">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`bg-white shadow-lg mb-4 rounded-lg overflow-hidden transition-all ${
              activeIndex === index ? 'border-l-4 border-blue-500' : ''
            }`}
          >
            <button
              onClick={() => toggleFAQ(index)}
              aria-expanded={activeIndex === index}
              aria-controls={`faq-answer-${index}`}
              className="w-full text-left p-5 flex justify-between items-center text-blue-700 font-medium hover:bg-blue-100 focus:outline-none"
            >
              <span>{faq.question}</span>
              <span className="text-blue-500">{activeIndex === index ? '-' : '+'}</span>
            </button>
            {activeIndex === index && (
              <div
                id={`faq-answer-${index}`}
                className="p-5 text-blue-600 border-t border-blue-100"
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
