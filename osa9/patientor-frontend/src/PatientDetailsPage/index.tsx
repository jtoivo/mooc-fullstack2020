import React, { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Container, Icon } from "semantic-ui-react";
import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatientDetails } from "../state";

const PatientPage: React.FC = () => {
  const [{ patient }, dispatch] = useStateValue();

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      console.log('fetching patient details');
      try {
        const { data: patientFromApi } = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
        dispatch(setPatientDetails(patientFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    if (!patient || patient.id !== id) {
      fetchPatient();
    }
  }, [dispatch, patient, id]);

  let genderIcon: "genderless" | "mars" | "venus" = "genderless";
  if (patient?.gender === Gender.Male) {
    genderIcon = "mars";
  }
  else if (patient?.gender === Gender.Female) {
    genderIcon = "venus";
  }

  return (
    <Container>
      <h3>{patient?.name}<Icon name={genderIcon} /></h3>
      <p>ssn: {patient?.ssn}</p>
      <p>occupation: {patient?.occupation}</p>
      <h4>Entries</h4>
      {patient?.entries.map(e => {
        return (
          <div key={e.id}>
            <p>{e.date} {e.description}</p>
            <ul>
              {e.diagnosisCodes?.map(d => {
                return <li key={d}>{d}</li>;
              })}
            </ul>
          </div>
        );
      })}
    </Container>
  );
};

export default PatientPage;
