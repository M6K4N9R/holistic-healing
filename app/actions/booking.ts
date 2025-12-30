'use server'
import { redirect } from 'next/navigation'
import { getSession } from '@/lib/auth'
import dbConnect from '@/db/dbConnect'
import Booking from '@/db/models/Booking'
import Treatment from '@/db/models/Treatment'
import Doctor from '@/db/models/Doctor'

export async function createBooking(formData: FormData) {
  const session = await getSession()
  if (!session?.user?.email) {
    throw new Error('Unauthorized - Please log in')
  }

  await dbConnect()

  // Get ObjectIds from form
  const treatmentId = formData.get('treatmentId') as string
  const doctorId = formData.get('doctorId') as string
  const date = formData.get('date') as string
  const time = formData.get('time') as string

  // Validate references exist
  const treatment = await Treatment.findById(treatmentId)
  const doctor = await Doctor.findById(doctorId)
  if (!treatment || !doctor) {
    throw new Error('Invalid treatment or doctor')
  }

  // Build patientDetails from session + form
  const patientDetails = {
    email: session.user.email,
    name: formData.get('patientName') as string,
    phone: formData.get('patientPhone') as string,
  }

  const booking = new Booking({
    treatment: treatmentId,
    doctor: doctorId,
    date: JSON.parse(date), // Your date object
    time,
    patientDetails,
  })

  await booking.save()
  redirect('/booking/confirmed')
}
