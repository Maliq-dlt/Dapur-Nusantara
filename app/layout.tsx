import type {Metadata} from 'next';
import { Newsreader, Inter, Space_Grotesk } from 'next/font/google';
import './globals.css'; // Global styles
import SmoothScrolling from '@/components/SmoothScrolling';
import CustomCursor from '@/components/CustomCursor';
import { SpeedInsights } from "@vercel/speed-insights/next";
const newsreader = Newsreader({ 
  subsets: ['latin'], 
  variable: '--font-newsreader',
  style: ['normal', 'italic'],
  display: 'swap',
});

const inter = Inter({ 
  subsets: ['latin'], 
  variable: '--font-inter',
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'], 
  variable: '--font-space-grotesk',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Dapur Nusantara | The Spiced Archive',
  description: 'Menjelajahi arsip kuliner yang terbakar oleh api cengkeh, pedas cabai rawit, dan kesegaran daun woku.',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="id" className={`${newsreader.variable} ${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="bg-background text-on-surface font-body selection:bg-secondary selection:text-on-secondary-fixed antialiased cursor-none" suppressHydrationWarning>
        <SmoothScrolling>
          <CustomCursor />
          {children}
        </SmoothScrolling>
        <SpeedInsights />
      </body>
    </html>
  );
}
