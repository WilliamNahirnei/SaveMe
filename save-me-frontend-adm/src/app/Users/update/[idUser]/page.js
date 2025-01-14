"use client";

import { Container, Typography, Box } from "@mui/material";
import UserForm from "@/Components/User/UserForm";

export default async function UpdateUserPage({ params }) {
    const { idUser } = params;

    return (
        <Container
            maxWidth="lg"
            sx={{ mt: 4, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Atualizar Usuário
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                <UserForm idUser={idUser} formType="edition" />
            </Box>
        </Container>
    );
}