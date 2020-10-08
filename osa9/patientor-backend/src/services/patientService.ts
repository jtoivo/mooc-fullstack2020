import patientsData from '../../data/patients.json';
import { Patient, PublicPatient, NewPatientEntry } from '../types';
import { Guid } from 'guid-typescript';

const patients: Array<Patient> = patientsData as Array<Patient>;

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

export default { getPatients, getPatientById, addPatient };