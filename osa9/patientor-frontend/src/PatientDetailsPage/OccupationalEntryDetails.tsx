import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { OccupationalHealthcareEntry } from "../types";
import DiagnosisList from "./DiagnosisList";

const OccupationalEntryDetails: React.FC<{ entry: OccupationalHealthcareEntry }> = ({ entry }) => {

  const showSickLeave = () => {
    return entry.sickLeave
      ? (
        <div><h5>Sick leave</h5>
          <p>Start: {entry.sickLeave?.startDate}<br />
      End: {entry.sickLeave?.endDate}</p></div>)
      : null;
  };

  return (
    <Segment>
      <Header as="h4">{entry.date} <Icon name="user md" size="big" />{entry.employerName}</Header>
      <p>{entry.description}</p>
      <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      {showSickLeave()}
    </Segment>);
};

export default OccupationalEntryDetails;