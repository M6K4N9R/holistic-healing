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
      <div className="min-h-screen bg-surface py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1>Treatment Not Found</h1>
          <Link href="/" className="btn-secondary inline-flex gap-2">
            <ChevronLeftIcon className="w-5 h-5 icon-surface" />
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
    <div className="min-h-screen bg-surface py-12 px-4 md:px-8">
      {/* Next/Prev Navigation */}
      <div className="max-w-6xl mx-auto mb-16 flex items-center justify-center gap-8">
        <button
          onClick={handlePrev}
          className="w-14 h-14 bg-surface-variant border-2 border-outline-variant 
                     backdrop-blur-md rounded-xl shadow-md hover:shadow-lg 
                     hover:bg-primary-container hover:border-primary-container 
                     transition-all duration-200 flex items-center justify-center 
                     hover:-translate-x-1 group"
          aria-label="Previous treatment"
        >
          <ArrowLeftIcon className="w-6 h-6 stroke-on-surface-variant group-hover:stroke-on-primary-container stroke-2" />
        </button>

        <h2>
          Other Treatments ({currentIndex + 1} / {totalTreatments})
        </h2>

        <button
          onClick={handleNext}
          className="w-14 h-14 bg-surface-variant border-2 border-outline-variant 
                     backdrop-blur-md rounded-xl shadow-md hover:shadow-lg 
                     hover:bg-primary-container hover:border-primary-container 
                     transition-all duration-200 flex items-center justify-center 
                     hover:translate-x-1 group"
          aria-label="Next treatment"
        >
          <ArrowRightIcon className="w-6 h-6 stroke-on-surface-variant group-hover:stroke-on-primary-container stroke-2" />
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-start px-4 lg:px-0">
        {/* Hero Image - Clean professional */}
        <div className="relative bg-surface-bright rounded-3xl overflow-hidden shadow-xl border border-outline-variant">
          <Image
            alt={currentTreatment.name}
            src={currentTreatment.image}
            width={900}
            height={675}
            className="w-full h-96 lg:h-[32rem] object-cover hover:scale-[1.02] transition-transform duration-500"
          />
        </div>

        {/* Content */}
        <div className="space-y-12">
          {/* Title & Description - Pure globals.css */}
          <div>
            <h1>{currentTreatment.name}</h1>
            <p className="mt-6">{currentTreatment.text}</p>
          </div>

          {/* Symptoms */}
          <div className="glass p-10 lg:p-12 rounded-3xl">
            <h3 className="flex items-center gap-3 mb-8">
              <span className="w-3 h-3 bg-primary rounded-full" />
              Symptoms Addressed
            </h3>
            <p className="mb-10">
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
                             hover:shadow-lg hover:-translate-y-1 transition-all duration-300 
                             cursor-pointer"
                >
                  <span className="font-semibold text-on-surface-variant group-hover:text-on-secondary-container">
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
              className="btn-secondary flex-1 flex items-center justify-center gap-3"
            >
              <ChevronLeftIcon className="w-6 h-6 icon-surface group-hover:-translate-x-1 transition-transform" />
              Go Back
            </Link>

            <Link
              href={`/booking?treatmentId=${currentTreatment._id}`}
              className="btn-primary flex-1 flex items-center justify-center gap-3"
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
