"use client";

import { usePathname } from "next/navigation";
import Header from "@/app/dashboard/_components/Header";
import Footer from "@/app/dashboard/_components/Footer";

export default function AuthLayout({ children }) {
  const pathname = usePathname();

  const isAuthPage =
    pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up");

  return (
    <>
      {!isAuthPage && <Header />}

      <main
        id="main-content"
        className={
          !isAuthPage
            ? "flex-grow pt-16 sm:pt-20 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8"
            : "flex-grow"
        }
      >
        {children}
        {!isAuthPage && <div className="h-16" />} {/* ✅ Gap above Footer */}
      </main>

      {!isAuthPage && <Footer />}
    </>
  );
}
