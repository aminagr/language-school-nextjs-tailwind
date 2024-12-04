import Navbar from '@/components/Navbar';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

export default async function HomeLayout({ children, params }) {
    const { locale } = await params;

    setRequestLocale(locale);  // Définir la locale pour l'application

    const messages = await getMessages();  // Charger les messages

    return (
      <div className="flex h-screen">
        <Navbar />  {/* Ajoutez le Navbar */}
        <main className="flex-1 p-4 bg-gray-100">
          {children}  {/* Le contenu de la page d'accueil sera inséré ici */}
        </main>
      </div>
    );
}
