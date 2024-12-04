import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { setRequestLocale } from 'next-intl/server';
import Navbar from '@/components/Navbar';
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({ children, params }) {

  const { locale } = await params;

  
  if (!routing.locales.includes(locale)) {
    notFound();
  }


  setRequestLocale(locale);


  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
  
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
