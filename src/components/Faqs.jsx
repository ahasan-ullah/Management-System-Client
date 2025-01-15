import { useEffect, useState } from "react";

const Faqs = () => {
  const [faqs, setFaqs] = useState([]);
  useEffect(() => {
    fetch("faqs.json")
      .then((res) => res.json())
      .then((data) => setFaqs(data));
  }, []);

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto text-center">
        {/* Heading */}
        <p className="text-center text-blue-400">Faqs</p>
        <h2 className="text-center text-4xl font-bold">
          Some Common Questions
        </h2>
        {/* FAQ List */}
        <div className="join join-vertical w-full max-w-3xl mx-auto mt-8">
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
    </section>
  );
};

export default Faqs;
