import React from 'react';
import Container from '@mui/material/Container';
import HelpPointList from "@/Components/HelpPoint/HelpPointList";

export default function Home() {
    return (
        <Container maxWidth={false} style={{ height: '100vh', padding: '20px' }}>
            <HelpPointList />
        </Container>
    );
}