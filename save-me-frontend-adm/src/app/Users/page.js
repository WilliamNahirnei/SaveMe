import React from 'react';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import UserList from '../../Components/User/UserList';

export default function Home() {
    return (
        <Container maxWidth={false} style={{ height: '100vh', padding: '20px' }}>
            <Card style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Usuários
                    </Typography>
                    <UserList />
                </CardContent>
            </Card>
        </Container>
    );
}
