import { Inter } from "next/font/google";
import "../globals.css";
import StoreProvider from "../StoreProvider";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "MealMind",
  description: "Search many recipes !",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={`${inter.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <StoreProvider>
            {children}
            <Toaster
              position="bottom-center"
              toastOptions={{
                style: {
                  background: "#1a1a1a",
                  color: "#fff",
                  border: "1px solid #333",
                },
              }}
            />
          </StoreProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
