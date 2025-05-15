"use client";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function Header() {
  const [session, setSession] = useState<any>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
  }, [supabase]);

  return (
    <nav className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-8 py-4 bg-white/70 backdrop-blur border-b border-gray-200 shadow-sm">
      <div className="flex items-center gap-2">
        <Link href="/" className="flex items-center">
          <Image src="/logo.png" alt="RefineMyText Logo" width={170} height={50} priority className="h-10 w-auto object-contain" />
        </Link>
      </div>
      {session ? (
        <div className="flex gap-4">
          <button onClick={() => supabase.auth.signOut()} className="px-4 py-2 rounded-md text-sm font-medium text-primary hover:bg-primary/10 transition">Log out</button>
        </div>
      ) : (
        <div className="flex gap-4">
          <Link href="/login" className="px-4 py-2 rounded-md text-sm font-medium text-primary hover:bg-primary/10 transition">Log in</Link>
          <Link href="/login" className="px-4 py-2 rounded-md text-sm font-semibold bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow hover:from-purple-600 hover:to-indigo-600 transition">Sign Up</Link>
        </div>
      )}
    </nav>
  );
} 