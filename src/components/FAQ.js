// components/FAQ.js
'use client';
import { useState } from 'react';

export default function FAQ() {
  const [open, setOpen] = useState(null);

  const toggle = (index) => {
    setOpen(open === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-gray-50">
      <div className="max-w-screen-xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-12">Questions fréquentes</h2>
        <div className="space-y-6">
          {[
            { question: 'Quels sont les horaires des cours ?', answer: 'Nos cours sont disponibles en soirée et le week-end.' },
            { question: 'Comment s’inscrire aux cours ?', answer: 'Vous pouvez vous inscrire directement sur notre site.' },
            { question: 'Quel diplôme est délivré à la fin de la formation ?', answer: 'Vous recevrez un diplôme reconnu par une université russe.' },
            { question: 'Quels sont les tarifs ?', answer: 'Les tarifs varient en fonction du programme choisi. Consultez notre page des tarifs.' }
          ].map((item, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md cursor-pointer hover:bg-gray-100" onClick={() => toggle(index)}>
              <h3 className="text-xl font-semibold">{item.question}</h3>
              {open === index && <p className="text-lg mt-2 text-gray-700">{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
