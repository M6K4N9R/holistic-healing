
export interface Symptom {
  name: string;
}

export interface Treatment {
  _id: string;
  name: string;
  slug: string;
  price: number;
  duration: number;
  description: string;
  text: string;
  image: string;
  location: string[];
  symptoms: string[];
}

export interface FirstConsultation {
  _id: string;
  name: string;
  slug: string;
  price: number;
  duration: number;
  description: string;
  image: string;
  text: string;
  location: string[];
  symptoms: string[];
}

export interface TreatmentsData {
  treatments: Treatment[];
  firstConsultation: FirstConsultation;
  treatmentNames?: { slug: string }[];
  logo?: any[];
}
