export type RiskLevel = "LOW" | "MEDIUM" | "HIGH";

export type InterventionStatus =
  | "PENDING_REVIEW"
  | "ASSIGNED"
  | "CONTACTED"
  | "FOLLOW_UP_SCHEDULED"
  | "CLOSED";

export interface CareQueueItem {
  encounter_id: number;
  age: string; // Age band, for example "[70-80)"
  risk_score: number;
  risk_level: RiskLevel;

  number_inpatient: number;
  number_emergency: number;
  number_outpatient: number;
  time_in_hospital: number;
  num_medications: number;

  intervention_status: InterventionStatus | null;
  assigned_to: string | null;
  notes: string | null;
  created_at: string | null;
  updated_at: string | null;
}