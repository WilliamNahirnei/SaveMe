import { Chip, Grid } from "@mui/material"
import React from "react"
import { useSnackbar } from "notistack";

import { activePatient, deactivePatient } from '../../api/user-api'

export default function PatientStatus(props) {
    const idPatient = props.idPatient
    const patientStatus = props.status
    const reloadParent = props.reloadParent

    const { enqueueSnackbar } = useSnackbar();
    function isActivePatient() {
        return patientStatus === "active"
    }

    async function callActivePatient() {
        try {
            await activePatient(idPatient)
            positiveNotify("Paciente Ativado")
            reloadParent(idPatient)
        } catch(e) {
            if (e?.response?.data?.messages?.length > 0) {
                e?.response?.data?.messages?.forEach(message => {
                    negativeNotify(`Erro ao ativar paciente ${message}`)
                });
            } else
                negativeNotify('Erro ao ativar paciente')
        }
    }

    async function callDeactivePatient() {
        try {
            await deactivePatient(idPatient)
            positiveNotify("Paciente Desativado")
            reloadParent(idPatient)
        } catch(e) {
            if (e?.response?.data?.messages?.length > 0) {
                e?.response?.data?.messages?.forEach(message => {
                    negativeNotify(`Erro ao desativar paciente ${message}`)
                });
            } else
                negativeNotify('Erro ao desativar paciente')
        }
    }

    const positiveNotify = (message) => {
        enqueueSnackbar(message, {
          variant: "success",
          autoHideDuration: 5000
        });
    };

    const negativeNotify = (errorMessage = '') => {
        enqueueSnackbar(errorMessage, {
            variant: "error",
            autoHideDuration: 5000
        });
    };

    if (isActivePatient()) {
        return (
            <Grid container rowSpacing={1} columnSpacing={1}>
                <Grid item sm={6}>
                    <Chip label="Ativo" color="success" />
                </Grid>
                <Grid item sm={6}>
                    <button type="button" className="btn btn-danger" onClick={callDeactivePatient}>
                        Desativar
                    </button>
                </Grid>
            </Grid>
        )
    } 
    else {
        return (
            <Grid container rowSpacing={1} columnSpacing={1}>
                <Grid item sm={6}>
                    <Chip label="Inativo" color="error" />
                </Grid>
                <Grid item md={6}>
                    <button type="button" className="btn btn-success" onClick={callActivePatient}>
                        Ativar
                    </button>
                </Grid>
            </Grid>
        )
    }
}