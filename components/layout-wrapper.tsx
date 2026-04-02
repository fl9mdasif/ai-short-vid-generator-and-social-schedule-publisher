"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  // Routes where we DON'T want the global Navbar and Footer (Dashboard and Auth)
  const isDashboard = pathname?.startsWith("/dashboard");
  const isAuth = pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");
  const hideLayout = isDashboard || isAuth;

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
