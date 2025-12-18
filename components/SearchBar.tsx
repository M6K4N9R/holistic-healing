"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon, XMarkIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  filteredSymptomsFromDuplicates?: string[];
}

export default function SearchBar({
  filteredSymptomsFromDuplicates = [],
}: SearchBarProps) {
  const [searchValue, setSearchValue] = useState("");
  const [showNoResults, setShowNoResults] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Sync with URL on mount
  useEffect(() => {
    const symptom = searchParams.get("symptom") || "";
    setSearchValue(symptom);

    const hasSymptom = symptom.length > 0;
    const symptomExists = filteredSymptomsFromDuplicates.some((s) =>
      s.toLowerCase().includes(symptom.toLowerCase())
    );

    setShowNoResults(hasSymptom && !symptomExists);
  }, [searchParams, filteredSymptomsFromDuplicates]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchValue.trim()) {
      router.push("/treatments");
      return;
    }

    // Check if symptom exists
    const symptomExists = filteredSymptomsFromDuplicates.some((s) =>
      s.toLowerCase().includes(searchValue.trim().toLowerCase())
    );

    setShowNoResults(!symptomExists);
    router.push(
      `/treatments?symptom=${encodeURIComponent(searchValue.trim())}`
    );
  };

  const handleClear = () => {
    setSearchValue("");
    setShowNoResults(false);
    router.push("/treatments");
    inputRef.current?.focus();
  };

  return (
    <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-16 px-4">
      {/* Label + Input */}
      <label htmlFor="symptom-search" className="sr-only">
        Search for symptoms
      </label>

      <div className="relative group">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400 group-focus-within:text-emerald-600 transition-all duration-300" />

        <input
          ref={inputRef}
          id="symptom-search"
          type="text"
          name="searchBar"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search symptoms like headache, stress, fatigue..."
          autoComplete="off"
          className="w-full pl-12 pr-12 py-5 bg-white/80 backdrop-blur-md rounded-3xl border-2 border-gray-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-200/50 focus:outline-none text-lg font-medium shadow-xl transition-all duration-300 hover:shadow-2xl"
        />

        {/* Clear Button */}
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 hover:bg-gray-100 rounded-full transition-all hover:scale-110"
            aria-label="Clear search"
          >
            <XMarkIcon className="w-5 h-5 text-gray-500 hover:text-red-500" />
          </button>
        )}
      </div>

      {/* Native Datalist */}
      <datalist id="symptoms">
        {filteredSymptomsFromDuplicates.slice(0, 10).map((symptom, index) => (
          <option key={`${symptom}-${index}`} value={symptom} />
        ))}
      </datalist>

      {/* No Results */}
      {showNoResults && (
        <div className="mt-4 p-6 bg-amber-50 border border-amber-200 rounded-2xl text-center">
          <p className="text-sm text-amber-800 mb-2">
            No treatments found for "<strong>{searchValue}</strong>"
          </p>
          <p className="text-sm text-amber-700">
            Consider booking <strong>First Consultation</strong> for
            personalized care.
          </p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6">
        {searchValue && (
          <button
            type="button"
            onClick={handleClear}
            className="flex-1 bg-white hover:bg-gray-50 border-2 border-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-xl transition-all hover:shadow-md"
          >
            See All Treatments
          </button>
        )}
        <button
          type="submit"
          className="flex-1 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300"
        >
          Search
        </button>
      </div>
    </form>
  );
}
