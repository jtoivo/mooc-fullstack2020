import React from 'react';
import { Entry } from "../types";
import HealthCheckEntryDetails from "./HealthCheckEntryDetails";
import HospitalEntryDetails from "./HospitalEntryDetails";
import OccupationalEntryDetails from "./OccupationalEntryDetails";

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

  const assertNever = (value: never): never => {
    throw new Error(`Unknown entry type: ${JSON.stringify(value)}`);
  };

  switch (entry.type) {
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalEntryDetails entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;