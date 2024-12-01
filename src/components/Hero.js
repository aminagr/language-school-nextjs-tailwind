'use client';
import { useEffect } from "react";
import { gsap } from "gsap";
import { useTranslations } from 'next-intl';

export default function Hero() {
  // const t = useTranslations('HomePage');


  useEffect(() => {
    const timeline = gsap.timeline();
    timeline
      .fromTo(
        ".hero-title",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 }
      )
      .fromTo(
        ".hero-paragraph",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5" 
      )
      .fromTo(
        ".hero-buttons",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        "-=0.5"
      )
      .fromTo(
        ".hero-image",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 1 },
        "-=0.5"
      );
  }, []);

  return (
    <div className="relative bg-white text-gray-800 py-8">
      <div className="absolute inset-0 opacity-50"></div>
      <div className="relative z-10 container mx-auto px-4 sm:px-8 md:px-10 lg:px-32 flex flex-col md:flex-col lg:flex-row items-center text-center lg:text-left gap-8">
        <div className="lg:w-3/5 md:mb-8 lg:mb-0">

          <h1 className="text-4xl font-extrabold leading-tight text-custom-blue hero-title">
            Apprenez le Russe avec <span className="text-custom-red">Passion</span>
          </h1>
 
          <p className="mt-4 text-lg md:text-xl text-gray-700 leading-relaxed md:leading-loose md:text-justify hero-paragraph">
            Nos professeurs natifs russophones vous offrent un programme intensif pour vous aider à maîtriser la langue rapidement. 
            En vous inscrivant, vous obtiendrez un diplôme reconnu, délivré par une université russe. 
            Inscrivez-vous dès maintenant et commencez votre apprentissage !
          </p>

          <div className="mt-6 flex gap-4 justify-center lg:justify-start hero-buttons">
            <button className="px-6 py-3 bg-custom-red text-white font-semibold rounded hover:bg-custom-blue transition">
              Inscrivez-vous maintenant
            </button>
            <button className="px-6 py-3 bg-transparent border border-gray-800 text-gray-800 rounded hover:bg-gray-800 hover:text-white transition">
              En savoir plus
            </button>
          </div>
        </div>


        <div className="md:w-1/2 lg:w-2/5">
          <img
            src="/images/moscow.jpg"
            alt="Image illustrant le russe"
            className="w-full h-auto max-w-md  mx-auto md:max-w-full hero-image"
          />
        </div>
      </div>
    </div>
  
    


    /*
    <div className="relative bg-gradient-to-b from-white via-blue-600 to-red-600 text-white py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>
      <div className="relative z-10 container mx-auto px-6 sm:px-12 md:px-48 flex flex-col md:flex-row items-center text-center md:text-left">
        <div className="md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Apprenez le Russe avec <span className="text-custom-coral">Passion</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/90 max-w-3xl leading-relaxed md:leading-loose">
          Nos professeurs natifs russophones vous offrent des cours personnalisés pour vous aider à maîtriser la langue rapidement. En vous inscrivant, vous obtienderez un diplôme reconnu, délivré par une université russe. Inscrivez-vous dès maintenant et commencez votre apprentissage !
          </p>
          <div className="mt-6 flex gap-4">
            <button className="px-6 py-3 bg-custom-coral text-white font-semibold rounded hover:bg-custom-coral transition">
              Inscrivez-vous maintenant
            </button>
            <button className="px-6 py-3 bg-transparent border border-white text-white rounded hover:bg-white hover:text-blue-600 transition">
              En savoir plus
            </button>
          </div>
        </div>

        <div className="mt-6 md:mt-0 md:w-1/2">
          <img
            src="/images/russia-algeria.png"
            alt="Image illustrant le russe"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
    
  */);
}
