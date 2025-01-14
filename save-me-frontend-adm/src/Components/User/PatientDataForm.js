import React, { useEffect, useState, } from 'react';
import PatientStatus from "./PatientStatus"
import { getPatient } from '../../api/user-api'
import { useSnackbar } from "notistack";

export default function PatientDataForm(props) {
    const idPatient = props.idPatient

    const { enqueueSnackbar } = useSnackbar();
    const [patientData, setPatientData] = useState(
        {
            fullName: "",
            birthDate: "",
            CPF: "",
            email: "",
            status: "",

            number:"",
            observation: "",
            street: "",
            neighborhood: "",
            city: "",
            state: "",
            country: "Brasil"
        }
    );

    useEffect(() => {
        loadPatientData(idPatient)
      }, [idPatient]);

    async function loadPatientData (idPatient) {
        try {
            const response = await getPatient(idPatient)
            const patientData = {
                fullName: response.patient.PatientFullName,
                CPF: response.patient.PatientCPF,
                email: response.patient.PatientEmail,
                birthDate: response.patient.PatientBirthDate,
                status: response.patient.PatientStatus,

                number: response.patient.Address.Number,
                observation: response.patient.Address.Observation,
                street: response.patient.Address.Street,
                neighborhood: response.patient.Address.Neighborhood,
                city: response.patient.Address.City,
                state: response.patient.Address.State,
                country: response.patient.Address.Country
            }
            setPatientData(patientData)
        }
        catch (e) {
            if (e?.response?.data?.messages?.length > 0) {
                e?.response?.data?.messages?.forEach(message => {
                    negativeNotify(message)
                });
            } else
                negativeNotify("Erro ao buscar dados do paciente")
        }
    }

    const negativeNotify = (errorMessage = '') => {
        enqueueSnackbar(`Erro ao buscar paciente. ${errorMessage}`, {
            variant: "error",
            autoHideDuration: 5000
        });
    };

    return (
        <div className="row m-3">
            <div className="card col-6 m-1">
                <div className="row">
                    <div className="col-6">
                        <div className="row"><h6>Nome Completo: </h6></div>
                        <div className="row"><span>{patientData.fullName}</span></div>
                    </div>
                    <div className="col-6">
                        <div className="row"><h6>Data de nascimento: </h6></div>
                        <div className="row"><span>{patientData.birthDate}</span></div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="row"><h6>CPF: </h6></div>
                        <div className="row"><span>{patientData.CPF}</span></div>
                    </div>
                    <div className="col-6">
                        <div className="row"><h6>E-MAIL: </h6></div>
                        <span>{patientData.email}</span>
                    </div>
                </div>
                <div className='m-2'>
                    <PatientStatus idPatient="1" status={patientData.status} reloadParent={loadPatientData} />
                </div>
            </div>
            <div className="card col-5 m-1">
                <div className="row">
                    <div className="col-6">
                        <div className="row"><h6>Rua: </h6></div>
                        <div className="row"><span>{patientData.street}</span></div>
                    </div>
                    <div className="col-6">
                        <div className="row"><h6>Numero:</h6></div>
                        <span>{patientData.number}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="row"><h6>Observação: </h6></div>
                        <div className="row"><span>{patientData.observation}</span></div>
                    </div>
                    <div className="col-6">
                        <div className="row"><h6>Bairro: </h6></div>
                        <span>{patientData.neighborhood}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className="row"><h6>Cidade: </h6></div>
                        <div className="row"><span>{patientData.city}</span></div>
                    </div>
                    <div className="col-6">
                        <div className="row"><h6>Estado: </h6></div>
                        <span>{patientData.state}</span>
                    </div>
                </div>
                <div className="row">
                    <div className="row"><h6>{patientData.country}</h6></div>
                    <span>Brasil</span>
                </div>
            </div>
        </div>
    )
}