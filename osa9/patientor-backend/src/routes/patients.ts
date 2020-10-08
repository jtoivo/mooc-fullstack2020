import express from 'express';
import patientService from '../services/patientService';
import toNewPatientEntry from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientService.getPatients();
  res.send(patients);
});

router.get('/:id', (_req, res) => {
  const patient = patientService.getPatientById(_req.params.id);
  res.send(patient);
});

router.post('/', (req, res) => {
  try {
    const entry = toNewPatientEntry(req.body);
    const addedPatient = patientService.addPatient(entry);
    res.json(addedPatient);
  }
  catch (e) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    res.status(400).send(e.message);
  }
});

export default router;