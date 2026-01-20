// components/booking/CustomCalendar.tsx
"use client";

import { useFormContext } from "react-hook-form";
import { useState, useCallback } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import { DateObject } from "@/types/booking";
import { getLocationDays } from "@/app/actions/new-booking-flow";
import { useEffect } from "react";

interface CustomCalendarProps {
  availableDays?: string[];
  className?: string;
}

export default function CustomCalendar({
  availableDays,
  className,
}: CustomCalendarProps) {
  const form = useFormContext();
  const treatmentId = form.watch("treatmentId");
  const location = form.watch("location");

  const [weekOffset, setWeekOffset] = useState(0); // 0=first 2 weeks, 1=next 2 weeks
  const [effectiveAvailableDays, setEffectiveAvailableDays] = useState<
    string[] | undefined
  >(availableDays);

  useEffect(() => {
    let cancelled = false;

    async function loadDays() {
      if (location && treatmentId) {
        const days = await getLocationDays(treatmentId, location);
        if (!cancelled) setEffectiveAvailableDays(days);
      } else {
        setEffectiveAvailableDays(availableDays);
      }
    }

    loadDays();
    return () => {
      cancelled = true;
    };
  }, [location, treatmentId, availableDays]);

  const availableDaysSet = new Set(effectiveAvailableDays || []);

  // Generate 14 days starting from today + offset*14
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const startDate = new Date(today);
  startDate.setDate(today.getDate() + weekOffset * 14);

  const days = Array.from({ length: 14 }, (_, i) => {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);

    const localDateStr = date.toLocaleDateString("sv"); // 👈 FIX: Local YYYY-MM-DD

    return {
      dateObj: {
        date: localDateStr, // "2026-01-25"
        day: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()],
      } as DateObject,
      dayNum: date.getDate(),
      dayName: date.toLocaleDateString("en-US", { weekday: "short" }),
      isToday: date.toDateString() === new Date().toDateString(),
    };
  });

  const handlePrevWeeks = () => setWeekOffset(Math.max(0, weekOffset - 1));
  const handleNextWeeks = () => setWeekOffset(weekOffset + 1);

  const handleDayClick = (dateObj: DateObject) => {
    form.setValue("dateObject", dateObj);
    console.log("IN CALENDAR dateObj: ", dateObj);
  };

  const selectedDate = form.watch("dateObject.date");
  const maxOffset = Math.floor((60 - 1) / 14);
  const isMaxOffset = weekOffset >= maxOffset;

  return (
    <div className={cn("space-y-4 w-full", className)}>
      {/* Nav Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevWeeks}
          disabled={weekOffset === 0}
          className="p-2 rounded-xl bg-surface-bright hover:bg-primary-container hover:text-on-primary-container disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeftIcon className="w-5 h-5" />
        </button>

        <div className="text-center">
          <div className="text-sm text-on-surface-variant font-semibold">
            {startDate.toLocaleDateString("en-US", { month: "long" })}
          </div>
        </div>

        <button
          onClick={handleNextWeeks}
          disabled={isMaxOffset}
          className={cn(
            "p-2 rounded-xl bg-surface-bright hover:bg-primary-container hover:text-on-primary-container transition-all",
            isMaxOffset && "opacity-50 cursor-not-allowed",
          )}
        >
          <ChevronRightIcon className="w-5 h-5" />
        </button>
      </div>

      {/* 7x2 Grid */}
      <div className="grid grid-cols-7 gap-3">
        {days.map(({ dateObj, dayNum, dayName, isToday }) => {
          const dateStr = dateObj.date;
          const isSelected = selectedDate === dateStr;
          const isAvailable = availableDaysSet.has(dateObj.day);

          return (
            <button
              key={dateStr}
              type="button"
              onClick={() => isAvailable && handleDayClick(dateObj)}
              disabled={!isAvailable}
              className={cn(
                "group p-3 rounded-xl border-2 transition-all duration-200 text-center h-20 flex flex-col justify-center",
                isSelected
                  ? "border-primary bg-primary text-on-primary shadow-xl scale-[1.02]"
                  : "border-outline-variant bg-surface-bright hover:border-primary hover:bg-primary-container hover:shadow-md hover:-translate-y-0.5",
                isToday && !isSelected && "ring-2 ring-primary/30 bg-primary/5",
                !isAvailable &&
                  "bg-outline-variant text-on-surface-variant opacity-50 cursor-not-allowed",
              )}
            >
              <div className="font-semibold text-xs text-on-surface-variant uppercase tracking-wide group-hover:text-primary">
                {dayName}
              </div>
              <div className="text-xl font-black mt-1">{dayNum}</div>
            </button>
          );
        })}
      </div>

      {/* Status blocks */}
      {treatmentId && (
        <div className="text-xs text-center text-on-surface-variant p-3 bg-surface-dim rounded-xl">
          {selectedDate
            ? `Selected: ${new Date(selectedDate).toLocaleDateString()} (${form.watch("dateObject.day")})`
            : effectiveAvailableDays?.length
              ? `${effectiveAvailableDays.length} working days available`
              : "Pick treatment first"}
        </div>
      )}
      {treatmentId && location && (
        <div className="text-xs text-center p-3 bg-surface-dim rounded-xl">
          {location
            ? `Days at ${location}: ${effectiveAvailableDays?.join(", ") || "None"}`
            : `${availableDays?.length || 0} working days across all locations`}
        </div>
      )}
    </div>
  );
}
