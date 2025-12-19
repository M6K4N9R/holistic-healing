'use client';

import { useFormContext } from 'react-hook-form';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import useSWR from 'swr';
import { Treatment } from '@/types/booking';

export function BookingStep1({ step }: { step: number }) {
  const form = useFormContext();
  const { data: treatments } = useSWR<Treatment[]>('/api/treatments');

  return (
    <div className={step >= 1 ? 'block' : 'hidden'}>
      <h3 className="text-2xl font-bold text-emerald-700 mb-6">Choose Treatment & Date</h3>
      
      {/* Treatment Buttons */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
        {treatments?.map(treatment => (
          <Button
            key={treatment._id}
            variant={form.watch('treatmentId') === treatment._id ? 'default' : 'outline'}
            onClick={() => {
              form.setValue('treatmentId', treatment._id);
              form.setValue('treatmentName', treatment.name);
            }}
            className="h-20 rounded-2xl text-left justify-start"
          >
            {treatment.name}
          </Button>
        ))}
      </div>

      {/* Calendar */}
      {form.watch('treatmentId') && (
        <Calendar
          mode="single"
          selected={form.watch('date')}
          onSelect={(date) => form.setValue('date', date!)}
          disabled={(date) => date < new Date()}
          className="rounded-2xl border-2 border-emerald-200 shadow-xl"
        />
      )}
    </div>
  );
}
