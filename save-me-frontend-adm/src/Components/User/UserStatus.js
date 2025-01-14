"use client";

import { Chip, Grid, Button } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import React from "react";
import { useSnackbar } from "notistack";

import StatusChip from '../BasicComponents/StatusChip';
import { activeUser, deactiveUser } from '../../api/user-api';

export default function UserStatus(props) {
    const { idUser, status: userStatus, reloadParent } = props;

    const { enqueueSnackbar } = useSnackbar();

    const isActiveUser = () => userStatus === "active";

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

    const handleUserActivation = async (action, successMessage, errorMessage) => {
        try {
            await action(idUser);
            positiveNotify(successMessage);
            reloadParent(idUser);
        } catch (e) {
            const messages = e?.response?.data?.messages || [errorMessage];
            messages.forEach(message => negativeNotify(message));
        }
    };

    return (
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
                <StatusChip status={userStatus}/>
            </Grid>
            <Grid item xs={6}>
                <Button
                    variant="contained"
                    color={isActiveUser() ? "error" : "success"}
                    onClick={() => handleUserActivation(
                        isActiveUser() ? deactiveUser : activeUser,
                        isActiveUser() ? "Usuário Desativado" : "Usuário Ativado",
                        isActiveUser() ? "Erro ao desativar usuário" : "Erro ao ativar usuário"
                    )}
                    startIcon={isActiveUser() ? <Cancel /> : <CheckCircle />}
                    fullWidth
                >
                    {isActiveUser() ? "Desativar" : "Ativar"}
                </Button>
            </Grid>
        </Grid>
    );
}