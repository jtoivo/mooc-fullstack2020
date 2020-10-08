import patientsData from '../../data/patients.json';
import { Patient, PatientWithoutSsn, NewPatientEntry } from '../types';
import { Guid } from 'guid-typescript';

const patients: Array<Patient> = patientsData as Array<Patient>;

const getPatients = (): PatientWithoutSsn[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const newPatient = {
    id: Guid.raw(),
    ...entry
  };
  patients.push(newPatient);
  return newPatient;
};

export default { getPatients, addPatient };