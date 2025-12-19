'use client';

import { useFormContext } from 'react-hook-form';
import useSWR from 'swr';
import { cn } from '@/lib/utils';
import { ClockIcon, UserIcon } from '@/components/ui/icons';

export default function BookingStep2({ step }: { step: number }) {
  const form = useFormContext();
  const treatmentId = form.watch('treatmentId');
  const date = form.watch('date');

  const { data: apiData, isLoading } = useSWR(treatmentId && date ? '/api/treatments' : null);

  if (isLoading) {
    return (
      <div className={step >= 2 ? 'block' : 'hidden'}>
        <div className="text-center py-20">
          <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-lg text-emerald-600 font-semibold">Loading time slots...</p>
        </div>
      </div>
    );
  }

  // Mock time slots (replace with real API later)
  const timeSlots = ['10:00-11:00', '11:00-12:00', '14:00-15:00', '15:00-16:00', '16:00-17:00'];
  const doctors = [
    { id: '1', name: 'Dr. Healing Touch', avatar: '/doctor1.jpg' },
    { id: '2', name: 'Dr. Blood Lover', avatar: '/doctor2.jpg' },
  ];

  return (
    <div className={step >= 2 ? 'block' : 'hidden'}>
      <h3 className="text-3xl font-bold text-emerald-700 mb-8 text-center bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent">
        Choose Time & Doctor
      </h3>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Time Slots */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <ClockIcon className="w-8 h-8 text-emerald-500" />
            <h4 className="text-2xl font-bold text-gray-900">Available Times</h4>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                type="button"
                onClick={() => form.setValue('timeSlot', slot)}
                className={cn(
                  'group relative h-20 rounded-2xl p-6 font-bold shadow-lg transition-all duration-300 overflow-hidden hover:shadow-xl hover:-translate-y-1',
                  form.watch('timeSlot') === slot
                    ? 'bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-2xl border-2 border-emerald-400'
                    : 'bg-white/80 backdrop-blur-xl border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50'
                )}
              >
                <span className="relative z-10">{slot}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Doctors */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <UserIcon className="w-8 h-8 text-emerald-500" />
            <h4 className="text-2xl font-bold text-gray-900">Select Doctor</h4>
          </div>
          <div className="space-y-4">
            {doctors.map((doctor) => (
              <button
                key={doctor.id}
                type="button"
                onClick={() => {
                  form.setValue('doctorId', doctor.id);
                  form.setValue('doctorName', doctor.name);
                }}
                className={cn(
                  'w-full group relative h-28 rounded-3xl p-6 font-bold shadow-lg transition-all duration-300 overflow-hidden hover:shadow-2xl hover:-translate-y-1 flex items-center gap-4',
                  form.watch('doctorId') === doctor.id
                    ? 'bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-2xl border-2 border-emerald-400'
                    : 'bg-white/80 backdrop-blur-xl border-2 border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50'
                )}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                  <UserIcon className="w-7 h-7 text-white" />
                </div>
                <div className="relative z-10">
                  <span className="block font-bold text-lg">{doctor.name}</span>
                  <span className="text-sm opacity-75">Experienced Healer</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
