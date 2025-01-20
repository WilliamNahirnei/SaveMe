"use client";

import React, { useEffect, useState } from "react";
import { Box, Card, Grid, Typography, Divider, Avatar, CircularProgress, Button } from "@mui/material";
import { useSnackbar } from "notistack";
import { deepPurple } from "@mui/material/colors";
import { useRouter } from "next/navigation";
import { AiFillEdit } from "react-icons/ai";


import UserStatus from "../../../Components/User/UserStatus";
import { getUser } from "../../../api/user-api";

export default function UserDetails({ params }) {
    const idUser = params.idUser;
    const router = useRouter();

    const { enqueueSnackbar } = useSnackbar();
    const [userData, setUserData] = useState({
        userFullName: "",
        userBirthDate: "",
        userEmail: "",
        userStatus: "",
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadUserData(idUser);
    }, [idUser]);

    async function loadUserData(idUser) {
        try {
            setLoading(true);
            const response = await getUser(idUser);
            setUserData({
                userFullName: response.user.userFullName,
                userBirthDate: response.user.userBirthDate,
                userEmail: response.user.userEmail,
                userStatus: response.user.userStatus,
            });
        } catch (e) {
            negativeNotify("Erro ao buscar dados do usuário");
        } finally {
            setLoading(false);
        }
    }

    const negativeNotify = (errorMessage = "") => {
        enqueueSnackbar(`Erro ao buscar usuário. ${errorMessage}`, {
            variant: "error",
            autoHideDuration: 5000,
        });
    };

    if (loading) {
        return (
            <Box m={3} display="flex" justifyContent="center" alignItems="center" height="80vh">
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box m={3}>
            <Card sx={{ p: 3, boxShadow: 3 }}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} display="flex" justifyContent="center">
                        <Avatar sx={{ bgcolor: deepPurple[500], width: 72, height: 72 }}>
                            {userData.userFullName.charAt(0)}
                        </Avatar>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" align="center" sx={{ fontWeight: "bold" }}>
                            {userData.userFullName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary" align="center">
                            {userData.userEmail}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider sx={{ my: 2 }} />
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="subtitle1">Data de Nascimento:</Typography>
                        <Typography variant="body1">{userData.userBirthDate}</Typography>
                    </Grid>
                    <Grid item xs={12} sx={{ mt: 2, display: "flex", gap: 2 }}>
                        <Grid item xs={8} sx={{ mt: 2, display: "flex", gap: 2 }}>
                            <UserStatus idUser={idUser} status={userData.userStatus} reloadParent={loadUserData} />
                        </Grid>
                        <Grid item xs={4} sx={{ mt: 2, display: "flex", gap: 2 }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={() => router.push(`/Users/update/${idUser}`)}
                                startIcon={<AiFillEdit />}
                                fullWidth
                            >
                                Editar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Card>
        </Box>
    );
}
