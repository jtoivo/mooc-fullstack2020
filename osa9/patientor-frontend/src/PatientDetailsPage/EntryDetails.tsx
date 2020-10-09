import React from 'react';
import { Diagnosis, Entry } from "../types";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalEntryDetails from "./OccupationalEntryDetails";

const EntryDetails: React.FC<{ entry: Entry; diagnoses: { [code: string]: Diagnosis } }> = ({ entry, diagnoses }) => {

  const assertNever = (value: never): never => {
    throw new Error(`Unknown entry type: ${JSON.stringify(value)}`);
  };

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} diagnoses={diagnoses} />;
    case "OccupationalHealthcare":
      return <OccupationalEntryDetails entry={entry} diagnoses={diagnoses} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;