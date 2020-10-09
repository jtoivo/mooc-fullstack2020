import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { HospitalEntry } from '../types';
import DiagnosisList from "./DiagnosisList";

const HospitalEntryDetails: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {

  const showDischarge = () => {
    return entry.discharge
      ? (
        <div><h5>Discharge</h5>
          <p>Date: {entry.discharge.date}<br />
      Criteria: {entry.discharge.criteria}</p></div>)
      : null;
  };

  return (
    <Segment>
      <Header as="h4">{entry.date} <Icon name="hospital" size="big" /></Header>
      <p>{entry.description}</p>
      <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      {showDischarge()}
    </Segment>);
};

export default HospitalEntryDetails;