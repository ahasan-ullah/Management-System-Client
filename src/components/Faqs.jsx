import { useEffect, useState } from "react";
import faqImage from "../assets/faqs.jpg";

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    fetch("faqs.json")
      .then((res) => res.json())
      .then((data) => setFaqs(data));
  }, []);

  return (
    <section className="mt-20">
      <div className="container mx-auto text-center">
        {/* Heading */}
        <p className="text-center text-blue-400">FAQs</p>
        <h2 className="text-center text-4xl font-bold">
          Frequently Asked Questions
        </h2>

        <div className="hero">
          <div className="hero-content flex-col lg:flex-row">
            <div className="space-y-5 md:hidden">
              <img src={faqImage} className="rounded-lg" />
            </div>
            {/* FAQ List */}
            <div className="md:w-3/5">
              <div className="join join-vertical w-full mx-auto mt-8">
                {faqs.map((faq) => (
                  <div
                    key={faq.id}
                    className="collapse collapse-arrow join-item border-base-300 border"
                  >
                    <input
                      type="radio"
                      name="faq-accordion"
                      defaultChecked={faq.id === 1}
                    />
                    <div className="collapse-title text-xl font-medium">
                      {faq.question}
                    </div>
                    <div className="collapse-content">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-5 md:w-2/5 hidden md:flex">
              <img src={faqImage} className="rounded-lg" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faqs;
