'use server';

import { BookingFormData } from '@/types/booking';
import dbConnect from '@/db/dbConnect';
import Booking from '@/db/models/Booking';

export async function createBooking(data: BookingFormData) {
  await dbConnect();
  const booking = new Booking(data);
  return await booking.save();
}
