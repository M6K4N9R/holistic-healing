'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { BookingFormSchema, type BookingFormData } from '@/types/booking';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { BookingStep1 } from '@/components/booking/BookingStep1';
import { BookingStep2 } from '@/components/booking/BookingStep2';
import { BookingStep3 } from '@/components/booking/BookingStep3';
import { createBooking } from '@/actions/booking';

export default function BookingPage() {
  const form = useForm<BookingFormData>({
    resolver: zodResolver(BookingFormSchema),
    defaultValues: {
      treatmentId: '',
      treatmentName: '',
      doctorId: '',
      doctorName: '',
      date: new Date(),
      timeSlot: '',
      patientName: '',
      email: '',
      phone: '',
    },
  });

  const onSubmit = async (data: BookingFormData) => {
    const booking = await createBooking(data);
    form.reset();
    // Show success modal
  };

  const step = form.watch('treatmentId') ? 
    (form.watch('date') && form.watch('timeSlot') && form.watch('doctorId') ? 3 : 2) : 1;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-indigo-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-indigo-600 bg-clip-text text-transparent text-center mb-16">
          Book Your Healing Session
        </h1>
        
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <BookingStep1 form={form} step={step} />
          <BookingStep2 form={form} step={step} />
          <BookingStep3 form={form} step={step} />
          
          {step === 3 && (
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-emerald-500 to-indigo-600 hover:from-emerald-600 hover:to-indigo-700 text-xl py-8 rounded-3xl shadow-xl"
              size="lg"
            >
              Confirm Booking
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
