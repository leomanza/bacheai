"use client";

import type { ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { AuthProvider } from "@/hooks/use-auth.tsx";

interface RootLayoutClientProps {
  children: ReactNode;
  dict: Dictionary;
}

export default function RootLayoutClient({
  children,
  dict,
}: RootLayoutClientProps) {
  return (
    <AuthProvider>
      <div className="relative flex min-h-screen flex-col bg-background">
        <Header dict={dict.header} />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster />
      </div>
    </AuthProvider>
  );
}
