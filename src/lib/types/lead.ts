/** Questionnaire data stored in leads.data.questionnaire */
export interface LeadQuestionnaire {
  costaDelSolExperience?: string;
  preferredLocation?: string;
  lifestylePreferences?: string[];
  priorities?: string[];
  stayDuration?: string;
  arrivalMonth?: string;
  // legacy fields (older leads)
  morningActivity?: string;
  environment?: string;
  interests?: string[];
  duration?: string;
}

/** Contact data stored in leads.data.contact */
export interface LeadContact {
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  nationality?: string;
}

/** Full lead data payload (leads.data column) */
export interface LeadData {
  questionnaire: LeadQuestionnaire;
  contact: LeadContact;
  submittedAt: string;
  source?: string;
}

/** Supabase leads table row */
export interface Lead {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  data: LeadData;
  created_at: string;
}
