import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { Diagnosis, OccupationalHealthcareEntry } from "../types";

const OccupationalEntryDetails: React.FC<{
  entry: OccupationalHealthcareEntry;
  diagnoses: { [code: string]: Diagnosis };
}> = ({ entry, diagnoses }) => {

  return (
    <Segment>
      <Header as="h4">{entry.date} <Icon name="user md" size="big" />{entry.employerName}</Header>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map(dc => {
          return <li key={dc}>{dc} {diagnoses[dc].name}</li>;
        })}
      </ul>
    </Segment>);
};

export default OccupationalEntryDetails;