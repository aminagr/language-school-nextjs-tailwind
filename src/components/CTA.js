'use client';
import { useEffect } from "react";
import { gsap } from "gsap";

export default function CTA() {

  useEffect(() => {
    const timeline = gsap.timeline();
    timeline
      .fromTo(
        ".cta-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(
        ".cta-paragraph",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5" 
      )
      .fromTo(
        ".cta-button",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      );
  }, []);

  return (
    <div className="relative bg-white text-gray-800 py-16">
      <div className="absolute inset-0 opacity-50 bg-white"></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-10 lg:px-32 flex flex-col items-center text-center gap-8">
        <h2 className="text-3xl font-extrabold text-custom-red cta-title">
          Prêt à apprendre le russe ?
        </h2>
        <p className="mt-4 text-lg md:text-xl text-gray-700 cta-paragraph">
          Nos cours intensifs vous permettent d'apprendre rapidement avec des professeurs natifs. Inscrivez-vous maintenant et commencez votre voyage linguistique !
        </p>
        <div className="mt-6 flex gap-4 justify-center">
          <button className="px-8 py-4 bg-custom-blue text-white font-semibold rounded hover:bg-custom-red transition cta-button">
            Inscrivez-vous maintenant
          </button>
        </div>
      </div>
    </div>
  );
}
