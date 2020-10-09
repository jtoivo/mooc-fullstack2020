import React from 'react';
import { useStateValue } from "../state";

const DiagnosisList: React.FC<{ diagnosisCodes?: string[] }> = ({ diagnosisCodes }) => {
  const [{ diagnoses }] = useStateValue();

  if (!diagnosisCodes) {
    return null;
  }

  return (
    <div>
      <ul>
        {diagnosisCodes?.map(dc => {
          return <li key={dc}>{dc} {diagnoses[dc].name}</li>;
        })}
      </ul>
    </div>);
};

export default DiagnosisList;