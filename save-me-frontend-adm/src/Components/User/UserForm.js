"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { getUser, storeUser, updateUser } from "@/api/user-api";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";

export default function UserForm({ idUser, formType }) {
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const [userData, setUserData] = useState({
        fullName: "",
        birthDate: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});

    const changeUserData = (event) => {
        const { id, value } = event.target;
        setUserData((prevState) => ({
            ...prevState,
            [id]: value,
        }));
        setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
    };

    const isEditForm = useCallback(() => formType === "edition", [formType]);

    useEffect(() => {
        if (isEditForm()) {
            loadUserData(idUser);
        }
    }, [isEditForm, idUser]);

    async function loadUserData(idUser) {
        const response = await getUser(idUser);
        setUserData({
            fullName: response.user.userFullName,
            birthDate: response.user.userBirthDate,
            email: response.user.userEmail,
            password: "",
            confirmPassword: "",
        });
    }

    function submitForm(event) {
        event.preventDefault();
        const newErrors = {};

        if (userData.password !== userData.confirmPassword) {
            newErrors.confirmPassword = "As senhas não coincidem.";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        saveUser(userData);
    }

    async function saveUser(userData) {
        if (isEditForm()) {
            await updateUser(idUser, userData);
            positiveNotify("Usuário atualizado com sucesso");
            router.push(`/Users/${idUser}`);
        } else {
            const user = await storeUser(userData);
            positiveNotify("Usuário criado com sucesso");
            router.push(`/Users/${user.idUser}`);
        }
    }

    const positiveNotify = (message) => {
        enqueueSnackbar(message, {
            variant: "success",
            autoHideDuration: 5000,
        });
    };

    return (
        <Paper elevation={3} sx={{ width: '100%', padding: 4 }}>
            <Typography variant="h5" align="center" gutterBottom>
                {isEditForm() ? "Editar Usuário" : "Criar Usuário"}
            </Typography>
            <form onSubmit={submitForm}>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            id="fullName"
                            label="Nome Completo"
                            variant="outlined"
                            fullWidth
                            value={userData.fullName}
                            onChange={changeUserData}
                            required
                            error={Boolean(errors.fullName)}
                            helperText={errors.fullName}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="birthDate"
                            label="Data de Nascimento"
                            type="date"
                            variant="outlined"
                            fullWidth
                            value={userData.birthDate}
                            onChange={changeUserData}
                            required
                            error={Boolean(errors.birthDate)}
                            helperText={errors.birthDate}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="email"
                            label="E-mail"
                            variant="outlined"
                            type="email"
                            fullWidth
                            value={userData.email}
                            onChange={changeUserData}
                            required
                            error={Boolean(errors.email)}
                            helperText={errors.email}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="password"
                            label="Senha"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={userData.password}
                            onChange={changeUserData}
                            required
                            error={Boolean(errors.password)}
                            helperText={errors.password}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            id="confirmPassword"
                            label="Confirmação de Senha"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={userData.confirmPassword}
                            onChange={changeUserData}
                            required
                            error={Boolean(errors.confirmPassword)}
                            helperText={errors.confirmPassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Salvar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Paper>
    );
}
