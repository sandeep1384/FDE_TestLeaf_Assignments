import {
  add_encounter,
  get_encounter,
  get_encounters,
} from "./build/add_encounter.js";

const form = document.querySelector("#add-encounter-form");
const submitButton = document.querySelector("#add-encounter-btn");
const searchForm = document.querySelector("#search-encounter-form");
const searchButton = document.querySelector("#search-encounter-btn");
const status = document.querySelector("#form-status");
const result = document.querySelector("#encounter-result");
const tableStatus = document.querySelector("#encounter-table-status");
const encounterTableBody = document.querySelector("#encounter-table-body");

form.addEventListener("submit", Add_Encounter);
searchForm.addEventListener("submit", Search_Encounter);

async function Add_Encounter(event) {
  event.preventDefault();
  submitButton.disabled = true;
  status.textContent = "Creating encounter...";
  result.replaceChildren();

  const formData = new FormData(form);
  const encounter = {
    encounter_id: Number(formData.get("encounter_id")),
    patient_nbr: Number(formData.get("patient_nbr")),
    age: formData.get("age").trim(),
    time_in_hospital: Number(formData.get("time_in_hospital")),
    number_inpatient: Number(formData.get("number_inpatient")),
    number_emergency: Number(formData.get("number_emergency")),
    number_outpatient: Number(formData.get("number_outpatient")),
    num_medications: Number(formData.get("num_medications")),
    num_lab_procedures: Number(formData.get("num_lab_procedures")),
    discharge_disposition_id: Number(
      formData.get("discharge_disposition_id"),
    ),
    admission_type_id: Number(formData.get("admission_type_id")),
    readmitted: formData.get("readmitted"),
  };

  let createdEncounter;
  try {
    createdEncounter = await add_encounter(encounter);
  } catch (error) {
    status.textContent =
      error instanceof Error ? error.message : "Unable to create encounter.";
    submitButton.disabled = false;
    return;
  }

  window.alert(
    `Encounter added successfully!\nEncounter ID: ${createdEncounter.encounter_id}\nPatient number: ${createdEncounter.patient_nbr}`,
  );
  status.textContent = `Encounter ${createdEncounter.encounter_id} was saved. Loading it from the database...`;

  try {
    const savedEncounter = await get_encounter(createdEncounter.encounter_id);
    displayEncounter(savedEncounter);
    await loadEncounters(savedEncounter);
    status.textContent = `Encounter ${savedEncounter.encounter_id} was saved and retrieved from the database.`;
  } catch (error) {
    displayEncounter(createdEncounter);
    status.textContent =
      `Encounter ${createdEncounter.encounter_id} was saved, but could not be reloaded: ` +
      (error instanceof Error ? error.message : "Unknown retrieval error.");
  } finally {
    submitButton.disabled = false;
  }
}

async function Search_Encounter(event) {
  event.preventDefault();
  searchButton.disabled = true;
  status.textContent = "Searching for encounter...";
  result.replaceChildren();

  const encounterId = Number(
    new FormData(searchForm).get("encounter_id"),
  );
  if (!Number.isSafeInteger(encounterId) || encounterId < 0) {
    status.textContent = "Enter a valid encounter ID.";
    searchButton.disabled = false;
    return;
  }

  try {
    const encounter = await get_encounter(encounterId);
    displayEncounter(encounter, "Encounter details");
    await loadEncounters(encounter);
    status.textContent = `Encounter ${encounter.encounter_id} loaded from the API.`;
  } catch (error) {
    status.textContent =
      error instanceof Error ? error.message : "Unable to find encounter.";
  } finally {
    searchButton.disabled = false;
  }
}

async function loadEncounters(encounterToInclude) {
  tableStatus.textContent = "Loading encounters from the database...";

  try {
    const encounters = await get_encounters();
    if (
      encounterToInclude &&
      !encounters.some(
        (encounter) => encounter.encounter_id === encounterToInclude.encounter_id,
      )
    ) {
      encounters.push(encounterToInclude);
    }

    encounterTableBody.replaceChildren();
    for (const encounter of encounters) {
      const row = document.createElement("tr");
      for (const value of [
        encounter.encounter_id,
        encounter.patient_nbr,
        encounter.age,
        encounter.time_in_hospital,
        encounter.number_inpatient,
        encounter.number_emergency,
        encounter.number_outpatient,
        encounter.risk_score,
        encounter.risk_level,
      ]) {
        const cell = document.createElement("td");
        cell.textContent = String(value);
        row.append(cell);
      }
      encounterTableBody.append(row);
    }
    tableStatus.textContent = `Showing ${encounters.length} encounter(s) retrieved from the database API.`;
  } catch (error) {
    tableStatus.textContent =
      error instanceof Error
        ? error.message
        : "Unable to load encounters from the database.";
  }
}

function displayEncounter(encounter, title = "Created encounter") {
  const heading = document.createElement("h2");
  heading.textContent = title;
  const details = document.createElement("dl");

  for (const [key, value] of Object.entries(encounter)) {
    const label = document.createElement("dt");
    label.textContent = key.replaceAll("_", " ");
    const description = document.createElement("dd");
    description.textContent =
      value === null || value === undefined ? "" : String(value);
    details.append(label, description);
  }

  result.append(heading, details);
}

void loadEncounters();
