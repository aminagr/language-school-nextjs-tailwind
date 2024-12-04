import Navbar from '@/components/Navbar';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';

export default async function HomeLayout({ children, params }) {
    const { locale } = await params;

    setRequestLocale(locale); 
    const messages = await getMessages();  

    return (
      <div>
        <Navbar />  
        <main>
          {children}  
        </main>
      </div>
    );
}
