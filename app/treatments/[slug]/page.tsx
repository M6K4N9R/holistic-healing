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

  // Find current treatment index
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
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-emerald-50 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Treatment Not Found
          </h1>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-semibold"
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
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-12 px-4 md:px-8">
      {/* Next/Prev Navigation */}
      <div className="max-w-6xl mx-auto mb-12 flex items-center justify-center gap-8">
        <button
          onClick={handlePrev}
          className="w-14 h-14 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-300 transition-all duration-300 flex items-center justify-center hover:-translate-x-1"
          aria-label="Previous treatment"
        >
          <ArrowLeftIcon className="w-6 h-6 text-emerald-600" />
        </button>

        <h4 className="text-xl md:text-2xl font-bold text-gray-900 bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
          Discover Other Treatments ({currentIndex + 1} / {totalTreatments})
        </h4>

        <button
          onClick={handleNext}
          className="w-14 h-14 bg-white/80 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl hover:bg-emerald-50 border border-emerald-200 hover:border-emerald-300 transition-all duration-300 flex items-center justify-center hover:translate-x-1"
          aria-label="Next treatment"
        >
          <ArrowRightIcon className="w-6 h-6 text-emerald-600" />
        </button>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-start">
        {/* Hero Image */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
          <Image
            alt={currentTreatment.name}
            src={currentTreatment.image}
            width={800}
            height={600}
            className="w-full h-96 md:h-[500px] object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-700" />
        </div>

        {/* Content */}
        <div className="space-y-8">
          <div>
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6 leading-tight">
              {currentTreatment.name}
            </h1>
            <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
              <p>{currentTreatment.text}</p>
            </div>
          </div>

          {/* Symptoms */}
          <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-8 border border-emerald-100 shadow-xl">
            <h3 className="text-2xl font-bold text-emerald-700 mb-6 flex items-center gap-3">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              Symptoms Addressed
            </h3>
            <p className="text-lg text-gray-600 mb-8">
              Consider booking <strong>{currentTreatment.name}</strong> when you
              experience:
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {currentTreatment.symptoms.map((symptom, index) => (
                <div
                  key={index}
                  className="group bg-gradient-to-r from-emerald-50 to-indigo-50 rounded-2xl p-4 border border-emerald-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <span className="text-sm font-medium text-gray-800 group-hover:text-emerald-600">
                    {symptom}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              href="/"
              className="flex-1 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-800 font-semibold py-4 px-8 rounded-2xl text-center shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
            >
              ← Go Back
            </Link>
            <Link
              href="/booking"
              className="flex-1 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-bold py-4 px-8 rounded-2xl text-center shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              Book {currentTreatment.name}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
