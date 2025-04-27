"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function LoginForm() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    checkSession();
  }, [router, supabase.auth]);

  const handleGoogleLogin = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || window.location.origin}/auth/callback`,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error('Error signing in:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md p-6 space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-2xl font-bold">Welcome Back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to continue to Text Refinement Assistant
        </p>
      </div>
      
      <Button
        variant="outline"
        className="w-full"
        onClick={handleGoogleLogin}
        disabled={isLoading}
      >
        {isLoading ? "Signing in..." : "Continue with Google"}
      </Button>
    </Card>
  );
}