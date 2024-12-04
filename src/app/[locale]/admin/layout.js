import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import Sidebar from '@/components/SidebarAdmin'; 
import "../../globals.css";

export default async function AdminLayout({ children, params }) {
  const { locale } = await params;

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <div className="flex h-screen">
  
      <Sidebar />
      <main className="flex-1 p-4 bg-gray-100 overflow-x-auto">
        {children} 
      </main>
    </div>
  );
}
