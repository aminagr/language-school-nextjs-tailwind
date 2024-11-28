'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from '@/i18n/routing'; 

export default function Navbar({ locale }) {
  const t = useTranslations('HomePage');
  const [isMenuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  
  const [selectedLocale, setSelectedLocale] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem('locale') || locale;
    }
    return locale;
  });

  useEffect(() => {
    setSelectedLocale(locale);
  }, [locale]);

  const handleLanguageChange = (event) => {
    const newLocale = event.target.value;
    setSelectedLocale(newLocale);
    localStorage.setItem('locale', newLocale);
    router.push(`/${newLocale}${pathname}`);
  };


  const isActive = (path) => pathname === path ? 'text-custom-blue' : 'text-gray-700';

  return (
    <nav className="relative bg-transparent py-6 z-20">
      <div className="absolute inset-0 bg-white"></div>
      
      <div className="relative container mx-auto px-6 lg:px-32 flex justify-between items-center text-gray-700">

                <div className="text-2xl font-extrabold">
          <Link href="/" className="text-custom-red">
            <span className="text-custom-blue">My </span> 
            <span className="text-custom-red">Russian</span>
          </Link>
        </div>


        <div className="hidden md:flex gap-8">
          <Link href="/" className={`text-lg hover:text-custom-blue transition ${isActive('/')}`}>Accueil</Link>
          <Link href="#courses" className={`text-lg hover:text-custom-blue transition ${isActive('#courses')}`}>Cours</Link>
          <Link href="#about" className={`text-lg hover:text-custom-blue transition ${isActive('#about')}`}>A propos</Link>
          <Link href="#contact" className={`text-lg hover:text-custom-blue transition ${isActive('#contact')}`}>Contact</Link>
        </div>

    
        <button 
          onClick={() => setMenuOpen(!isMenuOpen)} 
          className="md:hidden text-2xl  text-custom-blue">
          {isMenuOpen ? '×' : '☰'}
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white flex flex-col items-center py-4 md:hidden">
          <Link href="/" className={`text-xl text-black py-2 hover:text-custom-blue transition ${isActive('/')}`}>Accueil</Link>
          <Link href="#courses" className={`text-xl text-black py-2 hover:text-custom-blue transition ${isActive('#courses')}`}>Cours</Link>
          <Link href="#about" className={`text-xl text-black py-2 hover:text-custom-blue transition ${isActive('#about')}`}>A propos</Link>
          <Link href="#contact" className={`text-xl text-black py-2 hover:text-custom-blue transition ${isActive('#contact')}`}>Contact</Link>

          {/* Language selector for mobile 
          <select
            onChange={handleLanguageChange}
            value={selectedLocale}
            className="p-2 border border-gray-300 rounded-md text-black bg-white focus:outline-none focus:ring-2 focus:ring-custom-red transition mt-4"
          >
            <option value="en">🇬🇧 English</option>
            <option value="fr">🇫🇷 Français</option>
          </select>
          */}
        </div>
      )}
    </nav>
  );
}
