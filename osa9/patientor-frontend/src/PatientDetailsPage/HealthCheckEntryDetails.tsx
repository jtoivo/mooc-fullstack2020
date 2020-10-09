import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { Diagnosis, HealthCheckEntry } from "../types";

const HealthCheckEntryDetails: React.FC<{
  entry: HealthCheckEntry;
  diagnoses: { [code: string]: Diagnosis };
}> = ({ entry, diagnoses }) => {

  type HealtColor = "green" | "yellow" | "orange" | "red";
  const color = ["green", "yellow", "orange", "red"][entry.healthCheckRating] as HealtColor;

  return (
    <Segment>
      <Header as="h4">{entry.date} <Icon name="heartbeat" size="big" /></Header>
      <p>{entry.description}</p>
      <ul>
        {entry.diagnosisCodes?.map(dc => {
          return <li key={dc}>{dc} {diagnoses[dc].name}</li>;
        })}
      </ul>
      <Icon color={color} name="heart" size="large" />
    </Segment>);
};

export default HealthCheckEntryDetails;