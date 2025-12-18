'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation'; // Not needed but ready
import { cn } from '@/lib/utils';

interface FirstConsultationProps {
  firstConsultation: {
    name: string;
    image: string;
    description?: string;
  };
}

export default function FirstConsultation({ 
  firstConsultation 
}: FirstConsultationProps) {
  return (
    <section className="bg-gradient-to-br from-emerald-50 to-indigo-50 rounded-3xl p-8 md:p-12 shadow-2xl max-w-4xl mx-auto mb-20">
      {/* Content */}
      <div className="text-center md:text-left md:pr-8 lg:pr-12">
        <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
          First Consultation
        </h3>
        <p className="text-lg md:text-xl text-gray-600 leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0">
          {firstConsultation.description || 
           'In-depth initial consultation resulting in personalized treatments plan'}
        </p>
        <Link
          href="/booking"
          className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-white font-semibold px-8 py-4 rounded-2xl text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 transform"
        >
          Book Your Journey
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </Link>
      </div>

      {/* Image */}
      <div className="mt-12 md:mt-0 md:ml-8 lg:ml-12">
        <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl group">
          <Image
            alt={firstConsultation.name}
            src={firstConsultation.image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            priority // eager equivalent for hero images
          />
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </div>
      </div>
    </section>
  );
}
