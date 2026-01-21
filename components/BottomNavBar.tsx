"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { MAIN_NAV } from "@/app/config/navigation";

import {
  HomeIcon as HomeOutline,
  CalendarDaysIcon as CalendarOutline,
  SparklesIcon as SparklesOutline,
} from "@heroicons/react/24/outline";
import {
  HomeIcon as HomeSolid,
  CalendarDaysIcon as CalendarSolid,
  SparklesIcon as SparklesSolid,
} from "@heroicons/react/24/solid";

const treatmentsPaths = [
  "/treatments/ear-accupuncture",
  "/treatments/reiki",
  "/treatments/fussreflexzonenmassage",
  "/treatments/schropfen",
  "/treatments/blutegeltherapie",
  "/treatments/drip-infusion-therapy",
];

const BottomNavBar = () => {
  const pathname = usePathname();

  const isTreatmentsActive = treatmentsPaths.includes(pathname);

  return (
    <nav
      className={cn(
        "md:hidden fixed bottom-0 left-0 right-0 z-40",
        "bg-surface-variant", // solid, no blur
        "border-t border-outline-variant",
        "shadow-[0_-10px_30px_rgba(0,0,0,0.12)]",
      )}
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="flex h-full">
        {/* Home */}
        <Link
          href="/"
          className={cn(
            "flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 px-2",
            "text-[11px] font-medium tracking-wide",
            "transition-all duration-200",
            pathname === "/"
              ? "bg-primary text-on-primary shadow-md scale-105"
              : "text-on-surface-variant hover:bg-surface hover:text-primary",
          )}
        >
          {pathname === "/" ? (
            <HomeSolid className="w-6 h-6" />
          ) : (
            <HomeOutline className="w-6 h-6" />
          )}
          <span>Home</span>
        </Link>

        {/* Treatments (group) */}
        <Link
          href="/treatments/ear-accupuncture"
          className={cn(
            "flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 px-2",
            "text-[11px] font-medium tracking-wide",
            "transition-all duration-200",
            isTreatmentsActive
              ? "bg-primary text-on-primary shadow-md scale-105"
              : "text-on-surface-variant hover:bg-surface hover:text-primary",
          )}
        >
          {isTreatmentsActive ? (
            <SparklesSolid className="w-6 h-6" />
          ) : (
            <SparklesOutline className="w-6 h-6" />
          )}
          <span>Treatments</span>
        </Link>

        {/* Book */}
        <Link
          href="/booking"
          className={cn(
            "flex flex-col items-center justify-center gap-0.5 flex-1 py-1.5 px-2",
            "text-[11px] font-medium tracking-wide",
            "transition-all duration-200",
            pathname === "/booking"
              ? "bg-primary text-on-primary shadow-md scale-105"
              : "text-on-surface-variant hover:bg-surface hover:text-primary",
          )}
        >
          {pathname === "/booking" ? (
            <CalendarSolid className="w-6 h-6" />
          ) : (
            <CalendarOutline className="w-6 h-6" />
          )}
          <span>Book</span>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavBar;
