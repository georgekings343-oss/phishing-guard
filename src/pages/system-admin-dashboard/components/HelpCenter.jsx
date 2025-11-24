// src/pages/HelpCenter.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const HelpCenter = () => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFaqs = async () => {
      try {
        const res = await axios.get("/api/help-center"); // backend route
        setFaqs(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchFaqs();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-6">Help Center</h1>
      {loading && <p>Loading FAQs...</p>}
      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-4 bg-card rounded-md shadow-md">
            <h2 className="font-semibold">{faq.question}</h2>
            <p className="text-secondary mt-1">{faq.answer}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpCenter;
