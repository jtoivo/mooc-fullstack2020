import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { Diagnosis, HospitalEntry } from '../types';

const HospitalEntryDetails: React.FC<{
  entry: HospitalEntry;
  diagnoses: { [code: string]: Diagnosis };
}> = ({ entry, diagnoses }) => {

  return (
    <Segment>
      <Header as="h4">{entry.date} <Icon name="hospital" size="big" /></Header>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map(dc => {
          return <li key={dc}>{dc} {diagnoses[dc].name}</li>;
        })}
      </ul>
    </Segment>);
};

export default HospitalEntryDetails;