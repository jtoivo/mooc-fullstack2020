import patientsData from '../../data/patients';
import { Patient, PublicPatient, NewPatientEntry, Entry } from '../types';
import { Guid } from 'guid-typescript';

const patients: Array<Patient> = patientsData;

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getPatientById = (id: string): Patient | undefined => {
  const patient = patients.find(p => p.id === id);
  if (patient && !patient.entries) {
    patient.entries = [];
  }
  return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: Guid.raw(),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

const addEntry = (patientId: string, entry: Entry): Entry => {

  if (!(entry.description && entry.date && entry.specialist)) {
    throw new Error('Required field missing.');
  }

  switch (entry.type) {
    case "Hospital":
      break;
    case "HealthCheck":
      if (!entry.healthCheckRating) {
        throw new Error('Health check rating missing.');
      }
      break;
    case "OccupationalHealthcare":
      if (!entry.employerName) {
        throw new Error('Employer name missing.');
      }
      break;
    default:
      throw new Error('Invalid entry type.');
      break;
  }

  entry.id = Guid.raw();
  const patient = patients.find(p => p.id === patientId);
  patient?.entries.push(entry);
  return entry;
};

export default { getPatients, getPatientById, addPatient, addEntry };