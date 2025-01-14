"use client";

import React, { useState, useEffect } from 'react';
import { useSnackbar } from 'notistack';
import Link from 'next/link';
import UserLine from "./UserLine";
import { getUsers } from "../../api/user-api";
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

export default function UserList() {
    const { enqueueSnackbar } = useSnackbar();
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        searchUsers();
    }, []);

    async function searchUsers() {
        const usersData = await getUsers(enqueueSnackbar);
        setUserList(usersData.userList);
    }

    return (
        <div>

            <Button
                variant="contained"
                color="primary"
                component={Link}
                href="/Users/create"
                style={{ marginBottom: '20px' }}
            >
                Cadastrar Novo Usuário
            </Button>

            <TableContainer component={Paper}>
                <Table aria-label="user table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Identificador</TableCell>
                            <TableCell>Nome Completo</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {userList.map((user) => (
                            <UserLine key={user.idUser} user={user} searchUsers={searchUsers} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}