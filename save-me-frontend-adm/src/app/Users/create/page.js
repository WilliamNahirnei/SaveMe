"use client";

import { Container, Typography, Box } from "@mui/material";
import UserForm from "@/Components/User/UserForm";

export default function CreateUserPage() {
    return (
        <Container
            maxWidth="lg"
            sx={{ mt: 4, height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
        >
            <Typography variant="h4" component="h1" align="center" gutterBottom>
                Criar Usuário
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', flexGrow: 1 }}>
                <UserForm />
            </Box>
        </Container>
    );
}