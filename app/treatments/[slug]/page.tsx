"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import useSWR from "swr";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ChevronLeftIcon,
} from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import TreatmentDetailSkeleton from "@/components/TreatmentDetailSkeleton";

interface Treatment {
  _id: string;
  name: string;
  slug: string;
  image: string;
  text: string;
  symptoms: string[];
}

interface TreatmentsData {
  treatments: Treatment[];
  treatmentNames: { slug: string }[];
}

export default function DetailedTreatment() {
  const params = useParams();
  const router = useRouter();
  const slug = params?.slug as string;

  const { data, isLoading, error } = useSWR<TreatmentsData>("/api/treatments");

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (data?.treatmentNames) {
      const index = data.treatmentNames.findIndex((t) => t.slug === slug);
      setCurrentIndex(index !== -1 ? index : 0);
    }
  }, [slug, data]);

  const currentTreatment = data?.treatments.find((t) => t.slug === slug);

  if (isLoading) {
    return <TreatmentDetailSkeleton />;
  }

  if (error || !currentTreatment) {
    return (
      <div className="min-h-screen bg-[hsl(var(--surface))] py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-[hsl(var(--dark))] mb-6">
            Treatment Not Found
          </h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[hsl(var(--emphasis))] hover:text-[hsl(var(--accent))] font-semibold transition-colors"
          >
            <ChevronLeftIcon className="w-5 h-5" />
            Back to Treatments
          </Link>
        </div>
      </div>
    );
  }

  const totalTreatments = data?.treatmentNames?.length || 0;

  const handleNext = () => {
    const nextIndex =
      currentIndex === totalTreatments - 1 ? 0 : currentIndex + 1;
    const nextSlug = data!.treatmentNames[nextIndex].slug;
    router.push(`/treatments/${nextSlug}`);
  };

  const handlePrev = () => {
    const prevIndex =
      currentIndex === 0 ? totalTreatments - 1 : currentIndex - 1;
    const prevSlug = data!.treatmentNames[prevIndex].slug;
    router.push(`/treatments/${prevSlug}`);
  };

  return (
    <div className="min-h-screen bg-[hsl(var(--surface))] py-12 px-4 md:px-8">
      {/* Next/Prev Navigation */}
      <div className="max-w-6xl mx-auto mb-16 flex items-center justify-center gap-8">
        <button
          onClick={handlePrev}
          className="w-14 h-14 bg-[hsl(var(--white))] backdrop-blur-md rounded-xl shadow-md hover:shadow-lg hover:bg-[hsl(var(--muted))]/30 border-2 border-[hsl(var(--neutral))]/60 hover:border-[hsl(var(--emphasis))]/80 transition-all duration-200 flex items-center justify-center hover:-translate-x-1 group"
          aria-label="Previous treatment"
        >
          <ArrowLeftIcon className="w-6 h-6 stroke-[hsl(var(--emphasis))] group-hover:stroke-[hsl(var(--accent))] stroke-2" />
        </button>

        <h3 className="text-2xl md:text-3xl font-bold text-[hsl(var(--dark))] bg-gradient-to-r from-[hsl(var(--emphasis))] to-[hsl(var(--accent))] bg-clip-text text-transparent tracking-tight">
          Other Treatments ({currentIndex + 1} / {totalTreatments})
        </h3>

        <button
          onClick={handleNext}
          className="w-14 h-14 bg-[hsl(var(--white))] backdrop-blur-md rounded-xl shadow-md hover:shadow-lg hover:bg-[hsl(var(--muted))]/30 border-2 border-[hsl(var(--neutral))]/60 hover:border-[hsl(var(--emphasis))]/80 transition-all duration-200 flex items-center justify-center hover:translate-x-1 group"
          aria-label="Next treatment"
        >
          <ArrowRightIcon className="w-6 h-6 stroke-[hsl(var(--emphasis))] group-hover:stroke-[hsl(var(--accent))] stroke-2" />
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-start px-4 lg:px-0">
        {/* Hero Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl group bg-[hsl(var(--white))]/50 backdrop-blur-xl border border-[hsl(var(--neutral))]/30">
          <Image
            alt={currentTreatment.name}
            src={currentTreatment.image}
            width={900}
            height={675}
            className="w-full h-96 lg:h-[32rem] object-cover group-hover:scale-[1.03] transition-transform duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--emphasis))]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-1000" />
        </div>

        {/* Content */}
        <div className="space-y-10 lg:space-y-12">
          {/* Title & Description */}
          <div>
            <h1 className="text-4xl lg:text-5xl font-black text-[hsl(var(--dark))] leading-[1.1] mb-8 bg-gradient-to-r from-[hsl(var(--dark))] via-[hsl(var(--emphasis))] to-[hsl(var(--accent))] bg-clip-text">
              {currentTreatment.name}
            </h1>
            <div className="prose prose-lg max-w-none leading-relaxed text-[hsl(var(--dark))] tracking-wide">
              <p className="text-lg lg:text-xl">{currentTreatment.text}</p>
            </div>
          </div>

          {/* Symptoms */}
          <div className="bg-[hsl(var(--white))] backdrop-blur-xl rounded-3xl p-10 lg:p-12 border border-[hsl(var(--neutral))]/30 shadow-2xl">
            <h3 className="text-3xl font-bold text-[hsl(var(--emphasis))] mb-8 flex items-center gap-3">
              <span className="w-3 h-3 bg-[hsl(var(--emphasis))] rounded-full shadow-sm" />
              Symptoms Addressed
            </h3>
            <p className="text-xl text-[hsl(var(--dark))] mb-10 leading-relaxed opacity-90">
              Consider booking{" "}
              <strong className="text-[hsl(var(--emphasis))]">
                {currentTreatment.name}
              </strong>{" "}
              when you experience:
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {currentTreatment.symptoms.map((symptom, index) => (
                <div
                  key={index}
                  className="group bg-[hsl(var(--white))] backdrop-blur-xl rounded-2xl p-6 border border-[hsl(var(--muted))]/50 hover:shadow-xl hover:-translate-y-2 hover:border-[hsl(var(--emphasis))]/75 transition-all duration-400 cursor-pointer hover:bg-[hsl(var(--muted))]/10"
                >
                  <span className="text-base font-semibold text-[hsl(var(--dark))] group-hover:text-[hsl(var(--emphasis))] transition-colors">
                    {symptom}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col lg:flex-row gap-6 pt-8">
            <Link
              href="/"
              className="flex-1 bg-[hsl(var(--white))] hover:bg-[hsl(var(--neutral))]/50 border-2 border-[hsl(var(--neutral))]/50 text-[hsl(var(--dark))] font-bold py-5 px-10 rounded-3xl text-center shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-400 text-lg flex items-center justify-center gap-3 group"
            >
              <ChevronLeftIcon className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Link>
            <Link
              href="/booking"
              className="flex-1 bg-gradient-to-r from-[hsl(var(--emphasis))] to-[hsl(var(--accent))] hover:from-[hsl(var(--dark))] hover:to-[hsl(var(--emphasis))] text-[hsl(var(--white))] font-black py-5 px-10 rounded-3xl text-center shadow-2xl hover:shadow-3xl hover:-translate-y-2 transition-all duration-500 text-lg flex items-center justify-center gap-3 group"
            >
              Book {currentTreatment.name}
              <span className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
