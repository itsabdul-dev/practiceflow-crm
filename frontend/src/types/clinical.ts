export interface Vitals {
  bloodPressure: string; // e.g. "128/84"
  heartRate: string; // e.g. "72 bpm"
  temperature: string; // e.g. "98.6 °F"
}

export interface Medication {
  id: string;
  name: string; // e.g. "Lisinopril 10mg"
  instructions: string; // e.g. "Once daily"
}

export type VisitType = 'Follow-up' | 'Annual Wellness' | 'Urgent Care';

export interface Visit {
  id: string;
  date: string;
  type: VisitType;
  diagnosis: string;
  note: string;
  providerName: string;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  patientId: string; // e.g. "PF-9921"
  allergies: string[];
  vitals: Vitals;
  isActiveEncounter: boolean;
  medications: Medication[];
  visitHistory: Visit[];
}

// The 4 sections of a SOAP note — the standard clinical documentation
// format the "Clinical Encounter Note" panel is built around.
export interface SoapNote {
  subjective: string;
  objective: string;
  assessment: string;
  plan: string;
}