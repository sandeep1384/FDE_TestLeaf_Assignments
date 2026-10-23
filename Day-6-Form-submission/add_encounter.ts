export interface EncounterInput {
  encounter_id: number;
  patient_nbr: number;
  age: string;
  time_in_hospital: number;
  number_inpatient: number;
  number_emergency: number;
  number_outpatient: number;
  num_medications: number;
  num_lab_procedures: number;
  discharge_disposition_id: number;
  admission_type_id: number;
  readmitted: string;
}

export interface Encounter extends EncounterInput {
  risk_score: number;
  risk_level: string;
  intervention_status?: string | null;
  assigned_to?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
}

const API_URL = "http://127.0.0.1:8000/encounters";

function isEncounter(value: unknown): value is Encounter {
  return (
    typeof value === "object" &&
    value !== null &&
    "encounter_id" in value &&
    typeof value.encounter_id === "number" &&
    "patient_nbr" in value &&
    typeof value.patient_nbr === "number" &&
    "age" in value &&
    typeof value.age === "string" &&
    "time_in_hospital" in value &&
    typeof value.time_in_hospital === "number" &&
    "number_inpatient" in value &&
    typeof value.number_inpatient === "number" &&
    "number_emergency" in value &&
    typeof value.number_emergency === "number" &&
    "number_outpatient" in value &&
    typeof value.number_outpatient === "number" &&
    "risk_score" in value &&
    typeof value.risk_score === "number" &&
    "risk_level" in value &&
    typeof value.risk_level === "string"
  );
}

async function parseEncounter(response: Response): Promise<Encounter> {
  if (!response.ok) {
    const details = await response.text();
    if (response.status === 409) {
      throw new Error(
        "This encounter ID already exists. Enter a unique encounter ID and try again.",
      );
    }
    throw new Error(
      `Encounter API request failed (${response.status}): ${details || response.statusText}`,
    );
  }

  const data: unknown = await response.json();
  if (!isEncounter(data)) {
    throw new Error("Encounter API response is missing a numeric encounter_id.");
  }
  return data;
}

export async function get_encounter(encounterId: number): Promise<Encounter> {
  const response = await fetch(
    `${API_URL}/${encodeURIComponent(encounterId)}`,
  );
  return parseEncounter(response);
}

export async function get_encounters(): Promise<Encounter[]> {
  const response = await fetch(`${API_URL}?limit=1000&offset=0`);
  if (!response.ok) {
    const details = await response.text();
    throw new Error(
      `Encounter list request failed (${response.status}): ${details || response.statusText}`,
    );
  }

  const data: unknown = await response.json();
  if (!Array.isArray(data) || !data.every(isEncounter)) {
    throw new Error("Encounter list response has an invalid format.");
  }
  return data;
}

export async function add_encounter(
  encounter: EncounterInput,
): Promise<Encounter> {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(encounter),
  });
  return parseEncounter(response);
}
