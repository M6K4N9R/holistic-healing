"use client";

import { useSession } from "next-auth/react";
import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import AuthButton from "./auth-button/AuthButton";
import { SunIcon } from "@/components/ui/icons";
import { MAIN_NAV } from "@/app/config/navigation";

interface LogoData {
  logoPrimary: string;
}

export default function UserTopBar() {
  const { data: session } = useSession();
  const { data, error } = useSWR<LogoData[]>("/api/treatments");
  const pathname = usePathname();

  // Loading skeleton
  if (!data && !error) {
    return (
      <section className="flex items-center justify-between p-4 md:px-8 lg:px-12 bg-surface-variant shadow-md h-16 md:h-20">
        <div className="w-10 h-10 bg-primary rounded-xl animate-pulse" />
        <div className="w-32 h-6 bg-secondary rounded-lg animate-pulse mx-auto md:mx-0" />
        <div className="w-24 h-8 bg-secondary rounded-lg animate-pulse" />
      </section>
    );
  }

  const logo = data?.[1]?.logoPrimary;
  const isTreatmentsActive = pathname.startsWith("/treatments/");

  return (
    <section className="flex items-center justify-between p-4 md:px-8 lg:px-12 bg-surface-variant backdrop-blur-md shadow-md border-b border-outline-variant sticky top-0 z-40 h-16 md:h-20">
      {/* Left: Logo/Greeting (branding) */}
      <div className="flex items-center space-x-3">
        {session ? (
          <div className="hidden md:flex items-center space-x-3 p-3 rounded-2xl bg-surface-bright backdrop-blur-sm shadow-md hover:shadow-xl transition-all duration-300 group">
            <SunIcon className="w-6 h-6 text-tertiary group-hover:rotate-12 transition-transform duration-500" />
            <div>
              <p className="text-xs text-secondary font-medium uppercase tracking-wide">
                Good morning
              </p>
              <h3 className="text-lg font-bold text-on-surface leading-tight">
                {session.user?.name || "Wellness Seeker"}
              </h3>
            </div>
          </div>
        ) : logo ? (
          <div className="relative p-2 bg-surface-bright rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 cursor-pointer">
            <Image
              alt="Holistic Healing Logo"
              src={logo}
              width={32}
              height={32}
              className="object-contain"
              priority
            />
          </div>
        ) : (
          <div className="w-8 h-8 bg-primary rounded-xl shadow-lg animate-pulse" />
        )}
      </div>

      {/* Center: Desktop Navigation (md+) */}
      <nav className="hidden md:flex items-center mx-auto gap-1 px-4">
        <div className="nav-container">
          {MAIN_NAV.map((item) => {
            const active =
              pathname === item.href ||
              (item.href === "/treatments/ear-accupuncture" &&
                isTreatmentsActive);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "nav-link",
                  active ? "nav-link-active" : "nav-link-inactive",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Right: Auth + Mobile nav trigger */}
      <div className="flex items-center gap-2">
        {/* Desktop spacer for balance */}
        <div className="hidden md:block w-24" />

        {/* Auth Button */}
        <AuthButton />
      </div>
    </section>
  );
}
