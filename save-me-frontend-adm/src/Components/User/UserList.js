"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";
import Link from "next/link";
import { getUsers } from "../../api/user-api";
import PaginationComponent from "../BasicComponents/PaginationComponent";
import UserLine from "./UserLine";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import UserFilters from "@/Components/User/UserFilters";

export default function UserList() {
    const { enqueueSnackbar } = useSnackbar();
    const [userList, setUserList] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        userFullName: "",
        userBirthDateEqual: "",
        userBirthDateGreaterThan: "",
        userBirthDateLessThan: "",
        userEmail: "",
        userStatus: "",
    });

    const searchUsers = useCallback(
        async (page = 1) => {
            try {
                const formattedFilters = Object.entries(filters)
                    .filter(([_, value]) => value)
                    .map(([field, value]) => ({
                        field,
                        value,
                        comparison: field.includes("BirthDate") ? (field.includes("Equal") ? "=" : field.includes("Greater") ? ">=" : "<=") : "=",
                    }));

                const usersData = await getUsers(
                    { page, pageSize: 10 },
                    formattedFilters,
                    enqueueSnackbar
                );

                setUserList(usersData.userList.users);
                setTotalItems(usersData.userList.total);
                setTotalPages(usersData.userList.totalPages);
            } catch (error) {
                enqueueSnackbar("Erro ao buscar usuários", { variant: "error" });
            }
        },
        [filters, enqueueSnackbar]
    );

    useEffect(() => {
        searchUsers(currentPage);
    }, [currentPage, searchUsers]);

    const handlePageChange = (page) => setCurrentPage(page);

    const handleInputChange = (field, value) => {
        setFilters((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleFilterSubmit = (event) => {
        event.preventDefault();
        setCurrentPage(1);
    };

    const handleClearFilters = () => {
        setFilters({
            userFullName: "",
            userBirthDateEqual: "",
            userBirthDateGreaterThan: "",
            userBirthDateLessThan: "",
            userEmail: "",
            userStatus: "",
        });
        setCurrentPage(1);
    };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Lista de Usuários
            </Typography>

            <UserFilters
                filters={filters}
                onInputChange={handleInputChange}
                onSubmit={handleFilterSubmit}
                onClear={handleClearFilters}
            />

            <Button
                variant="contained"
                color="primary"
                component={Link}
                href="/Users/create"
                style={{ marginBottom: "20px" }}
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

            <PaginationComponent
                totalItems={totalItems}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </div>
    );
}