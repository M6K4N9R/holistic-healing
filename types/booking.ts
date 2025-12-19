export interface Treatment {
  _id: string;
  name: string;
  slug: string;
  price: number;
  duration: number;
}

export interface Doctor {
  _id: string;
  firstName: string;
  lastName: string;
  treatments: string[]; // treatment IDs
}

export interface BookingFormData {
  treatmentId: string;
  treatmentName: string;
  doctorId: string;
  doctorName: string;
  date?: Date;
  timeSlot: string;
  patientName: string;
  email: string;
  phone: string;
}
