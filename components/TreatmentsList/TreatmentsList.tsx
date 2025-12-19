'use client'; // Optional - if using state/interactivity later

import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface Treatment {
  _id: string;
  name: string;
  slug: string;
  image: string;
  symptoms: string[];
}

interface TreatmentsListProps {
  treatments: Treatment[];
}

export default function TreatmentsList({ treatments }: TreatmentsListProps) {
  // Filter out First Consultation (server-side now)
  
  const filteredTreatments = treatments.filter(
    treatment => treatment.name !== 'First Consultation'
  );

  const renderTreatment = (treatment: Treatment) => (
    <Link href={`/treatments/${treatment.slug}`} key={treatment._id} className="group">
      <div className="relative bg-white rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden max-w-sm mx-auto">
        {/* Image */}
        <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-emerald-50 to-indigo-50">
          <Image
            alt={treatment.name}
            src={treatment.image}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-110 transition-transform duration-700"
            priority={false}
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
        </div>
        
        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-emerald-600 transition-colors mb-2 line-clamp-2">
            {treatment.name}
          </h3>
        </div>
      </div>
    </Link>
  );

  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <h3 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-16 bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
        Our Treatments
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredTreatments.map(renderTreatment)}
      </div>
    </section>
  );
}
