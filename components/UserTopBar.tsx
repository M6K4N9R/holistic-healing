"use client";

import { useSession } from "next-auth/react";
import useSWR from "swr";
import Image from "next/image";
import { cn } from "@/lib/utils";
import AuthButton from "./auth-button/AuthButton";
import { SunIcon } from "@/components/ui/icons";

interface UserTopBarProps {
  grechen?: any;
}

interface LogoData {
  logoPrimary: string;
}

export default function UserTopBar({ grechen }: UserTopBarProps) {
  const { data: session } = useSession();
  const { data, error } = useSWR<LogoData[]>("/api/treatments");

  // Loading skeleton
  if (!data && !error) {
    return (
      <section className="flex items-center justify-between p-6 bg-surface-variant shadow-md">
        <div className="w-10 h-10 bg-primary rounded-xl animate-pulse" />
        <div className="w-24 h-8 bg-secondary rounded-lg animate-pulse" />
      </section>
    );
  }

  const logo = data?.[1]?.logoPrimary;

  return (
    <section
      className="flex items-center justify-between p-6 md:px-8 lg:px-12 
                      bg-surface-variant backdrop-blur-md shadow-md 
                      border-b border-outline-variant sticky top-0 z-40"
    >
      {/* Logo or Greeting */}
      <div className="flex items-center space-x-4">
        {session ? (
          /* Logged-in greeting */
          <div
            className="flex items-center space-x-3 p-4 rounded-2xl 
                        bg-surface-bright/60 backdrop-blur-sm shadow-md 
                        hover:shadow-xl transition-all duration-300 group"
          >
            <SunIcon className="w-8 h-8 text-tertiary group-hover:rotate-12 transition-transform duration-500" />
            <div>
              <p className="text-xs text-secondary font-medium uppercase tracking-wide">
                Good morning
              </p>
              <h3 className="text-xl font-bold text-on-surface leading-tight">
                {session.user?.name || "Wellness Seeker"}
              </h3>
            </div>
          </div>
        ) : /* Guest logo */
        logo ? (
          <div
            className="relative p-3 bg-surface-bright/70 rounded-2xl shadow-lg 
                        hover:shadow-xl hover:-translate-y-0.5 
                        transition-all duration-300 cursor-pointer"
          >
            <Image
              alt="Holistic Healing Logo"
              src={logo}
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>
        ) : (
          <div className="w-10 h-10 bg-primary rounded-2xl shadow-lg animate-pulse" />
        )}
      </div>

      {/* Auth Button */}
      <div className="flex items-center">
        <AuthButton />
      </div>
    </section>
  );
}
