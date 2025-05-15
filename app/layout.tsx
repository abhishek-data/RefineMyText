import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'RefineMyText',
  description: 'Turn AI into natural human writing with the world\'s most powerful AI Humanizer.'
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-gradient-to-b from-[#f3e8ff] via-[#e0e7ff] to-[#f0fdfa] flex flex-col`}>
        {/* Top Navigation Bar*/}
        <nav className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur border-b border-gray-200 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-extrabold bg-gradient-to-r from-purple-500 to-indigo-500 bg-clip-text text-transparent tracking-tight">RefineMyText</span>
          </div>
          <div className="flex gap-4">
            <Link href="/login" className="px-4 py-2 rounded-md text-sm font-medium text-primary hover:bg-primary/10 transition">Log in</Link>
            <Link href="/login" className="px-4 py-2 rounded-md text-sm font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow hover:from-purple-600 hover:to-indigo-600 transition">Sign Up</Link>
          </div>
        </nav>
        <div className="h-20" />
        <div className="flex-1 flex flex-col">
          {children}
        </div>
        {/* Footer */}
        <footer className="w-full border-t border-gray-200 bg-white/80 py-4 px-8 flex items-center justify-between mt-auto">
          <span className="text-sm text-gray-700">© {new Date().getFullYear()} RefineMyText. All rights reserved.</span>
        </footer>
      </body>
    </html>
  );
}
