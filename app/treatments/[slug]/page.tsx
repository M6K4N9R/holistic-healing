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
    <div className="min-h-screen bg-surface text-on-surface py-12 px-4 md:px-8">
      {/* Next/Prev Navigation */}
      <div className="max-w-6xl mx-auto mb-16 flex items-center justify-center gap-8">
        <button
          onClick={handlePrev}
          className="w-14 h-14 bg-surface-variant border-2 border-outline-variant 
                     backdrop-blur-md rounded-xl shadow-md hover:shadow-lg 
                     hover:bg-primary-container hover:border-primary-container 
                     hover:text-on-primary-container transition-all duration-200 
                     flex items-center justify-center hover:-translate-x-1 group"
          aria-label="Previous treatment"
        >
          <ArrowLeftIcon className="w-6 h-6 stroke-on-surface-variant group-hover:stroke-on-primary-container stroke-2" />
        </button>

        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent tracking-tight">
          Other Treatments ({currentIndex + 1} / {totalTreatments})
        </h3>

        <button
          onClick={handleNext}
          className="w-14 h-14 bg-surface-variant border-2 border-outline-variant 
                     backdrop-blur-md rounded-xl shadow-md hover:shadow-lg 
                     hover:bg-primary-container hover:border-primary-container 
                     hover:text-on-primary-container transition-all duration-200 
                     flex items-center justify-center hover:translate-x-1 group"
          aria-label="Next treatment"
        >
          <ArrowRightIcon className="w-6 h-6 stroke-on-surface-variant group-hover:stroke-on-primary-container stroke-2" />
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start px-4 lg:px-0">
        {/* Hero Image */}
        <div
          className="relative bg-surface-bright rounded-3xl overflow-hidden shadow-xl 
                        border border-outline-variant group backdrop-blur-md"
        >
          <Image
            alt={currentTreatment.name}
            src={currentTreatment.image}
            width={900}
            height={675}
            className="w-full h-96 lg:h-[32rem] object-cover group-hover:scale-[1.03] transition-transform duration-700"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent 
                          opacity-0 group-hover:opacity-100 transition-all duration-700"
          />
        </div>

        {/* Content */}
        <div className="space-y-10 lg:space-y-12">
          {/* Title & Description */}
          <div>
            <h1
              className="text-4xl lg:text-5xl font-black leading-[1.1] mb-8 
                          bg-gradient-to-r from-primary via-secondary to-tertiary bg-clip-text text-transparent"
            >
              {currentTreatment.name}
            </h1>
            <div className="prose prose-lg max-w-none leading-relaxed tracking-wide">
              <p className="text-on-surface-variant text-lg lg:text-xl">
                {currentTreatment.text}
              </p>
            </div>
          </div>

          {/* Symptoms */}
          <div className="bg-surface-variant rounded-3xl p-10 lg:p-12 border border-outline-variant shadow-xl backdrop-blur-md">
            <h3 className="text-3xl font-bold text-primary mb-8 flex items-center gap-3">
              <span className="w-3 h-3 bg-primary rounded-full shadow-sm" />
              Symptoms Addressed
            </h3>
            <p className="text-xl text-on-surface mb-10 leading-relaxed opacity-90">
              Consider booking{" "}
              <strong className="text-primary">{currentTreatment.name}</strong>{" "}
              when you experience:
            </p>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
              {currentTreatment.symptoms.map((symptom, index) => (
                <div
                  key={index}
                  className="group bg-surface-bright rounded-2xl p-6 border border-outline-variant 
                             hover:bg-secondary-container hover:border-secondary-container 
                             hover:shadow-lg hover:-translate-y-2 transition-all duration-400 cursor-pointer 
                             backdrop-blur-md"
                >
                  <span
                    className="text-base font-semibold text-on-surface-variant 
                                   group-hover:text-on-secondary-container transition-colors"
                  >
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
              className="flex-1 bg-surface-variant hover:bg-secondary-container 
                         border-2 border-outline-variant hover:border-secondary 
                         text-on-surface-variant hover:text-on-secondary-container 
                         font-bold py-5 px-10 rounded-3xl shadow-xl hover:shadow-2xl 
                         hover:-translate-y-1 transition-all duration-400 text-lg 
                         flex items-center justify-center gap-3 group backdrop-blur-md"
            >
              <ChevronLeftIcon className="w-6 h-6 group-hover:-translate-x-1 transition-transform stroke-current" />
              Go Back
            </Link>
            <Link
              href="/booking"
              className="flex-1 bg-primary hover:bg-primary-container 
                         text-on-primary hover:text-on-primary-container 
                         font-black py-5 px-10 rounded-3xl shadow-2xl hover:shadow-3xl 
                         hover:-translate-y-2 transition-all duration-500 text-lg 
                         flex items-center justify-center gap-3 group backdrop-blur-md"
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
