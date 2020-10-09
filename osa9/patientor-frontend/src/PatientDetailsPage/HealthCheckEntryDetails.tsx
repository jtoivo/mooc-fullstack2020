import React from 'react';
import { Header, Icon, Segment } from 'semantic-ui-react';
import { HealthCheckEntry } from "../types";
import DiagnosisList from "./DiagnosisList";

const HealthCheckEntryDetails: React.FC<{ entry: HealthCheckEntry }> = ({ entry }) => {

  type HealtColor = "green" | "yellow" | "orange" | "red";
  const color = ["green", "yellow", "orange", "red"][entry.healthCheckRating] as HealtColor;

  return (
    <Segment>
      <Header as="h4">{entry.date} <Icon name="heartbeat" size="big" /></Header>
      <p>{entry.description}</p>
      <DiagnosisList diagnosisCodes={entry.diagnosisCodes} />
      <Icon color={color} name="heart" size="large" />
    </Segment>);
};

export default HealthCheckEntryDetails;