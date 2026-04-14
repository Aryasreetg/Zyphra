import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'Zyphra | Build Real-World Skills, Ship Real Projects, Become Job-Ready',
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
    <html lang="en" className="scroll-smooth">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="antialiased">
        <Navbar />
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}
