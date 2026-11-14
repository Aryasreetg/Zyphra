import type { Metadata } from 'next';
import './globals.css';
import { Fraunces, Instrument_Sans } from 'next/font/google';

// Display serif with real character (optical sizes + soft italics), paired with a crisp grotesk
const display = Fraunces({
  subsets: ['latin'],
  variable: '--font-display',
  axes: ['opsz', 'SOFT'],
  style: ['normal', 'italic'],
  display: 'swap',
});
const body = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Zyphraa — Mentor-led, project-first tech education',
  description:
    'Zyphra — where you build real-world skills, ship real projects, and become a job-ready developer ',
  keywords:
    'Java, Spring Boot, Microservices, React, Next.js, TypeScript, Software Engineer,  Project Lead',
  authors: [{ name: 'Arya Sree T G' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aryasree.dev',
    title: 'Arya Sree T G | Senior Software Engineer',
    description: 'Zyphra — where you build real-world skills, ship real projects, and become a job-ready developer ',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`scroll-smooth scroll-pt-24 ${display.variable} ${body.variable}`}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
