
export interface Symptom {
  name: string;
}

export interface Treatment {
  _id: string;
  name: string;
  symptoms: Symptom[];
  description?: string;
  image?: string;
}

export interface FirstConsultation {
  title: string;
  description: string;
  price: number;
  duration: number;
}

export interface TreatmentsData {
  treatments: Treatment[];
  firstConsultation: FirstConsultation;
}
