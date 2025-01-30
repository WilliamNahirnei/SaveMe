"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useSnackbar } from "notistack";
import { getHelpPoints } from "@/api/helpPoint-api";
import PaginationComponent from "../BasicComponents/PaginationComponent";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import HelpPointLine from "@/Components/HelpPoint/HelpPointLine";

export default function HelpPointList() {
    const { enqueueSnackbar } = useSnackbar();
    const [helpPointList, setHelpPointList] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    //Implementar para pedidos de socorro
    const [filters, setFilters] = useState({
        userFullName: "",
        userBirthDateEqual: "",
        userBirthDateGreaterThan: "",
        userBirthDateLessThan: "",
        userEmail: "",
        userStatus: "",
    });

    const searchHelpPoints = useCallback(
        async (page = 1) => {
            try {
                //Implementar para pedidos de socorro
                // const formattedFilters = Object.entries(filters)
                //     .filter(([_, value]) => value)
                //     .map(([field, value]) => ({
                //         field,
                //         value,
                //         comparison: field.includes("BirthDate") ? (field.includes("Equal") ? "=" : field.includes("Greater") ? ">=" : "<=") : "=",
                //     }));
                const filters = null

                const helpPointsData = await getHelpPoints(
                    { page, pageSize: 10 },
                    //Implementar para pedidos de socorro
                    // formattedFilters,
                    null,
                    enqueueSnackbar
                );

                setHelpPointList(helpPointsData.list.helpPoints);
                setTotalItems(helpPointsData.list.total);
                setTotalPages(helpPointsData.list.totalPages);
            } catch (error) {
                enqueueSnackbar("Erro ao buscar pedidos", { variant: "error" });
            }
        },
        [filters, enqueueSnackbar]
    );

    useEffect(() => {
        searchHelpPoints(currentPage);
    }, [currentPage, searchHelpPoints]);

    const handlePageChange = (page) => setCurrentPage(page);

    //Implementar para pedidos de socorro
    // const handleInputChange = (field, value) => {
    //     setFilters((prev) => ({
    //         ...prev,
    //         [field]: value,
    //     }));
    // };

    //Implementar para pedidos de socorro
    // const handleFilterSubmit = (event) => {
    //     event.preventDefault();
    //     setCurrentPage(1);
    // };

    //Implementar para pedidos de socorro
    // const handleClearFilters = () => {
    //     setFilters({
    //         userFullName: "",
    //         userBirthDateEqual: "",
    //         userBirthDateGreaterThan: "",
    //         userBirthDateLessThan: "",
    //         userEmail: "",
    //         userStatus: "",
    //     });
    //     setCurrentPage(1);
    // };

    return (
        <div>
            <Typography variant="h5" gutterBottom>
                Pedidos de socorro
            </Typography>

            {/*Implementar para pedidos de socorro*/}
            {/*<UserFilters*/}
            {/*    filters={filters}*/}
            {/*    onInputChange={handleInputChange}*/}
            {/*    onSubmit={handleFilterSubmit}*/}
            {/*    onClear={handleClearFilters}*/}
            {/*/>*/}

            <TableContainer component={Paper}>
                <Table aria-label="helpPoint table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Identificador</TableCell>
                            <TableCell>N° Pessoas</TableCell>
                            <TableCell>N° Animais</TableCell>
                            <TableCell>Detalhes</TableCell>
                            <TableCell>Data solicitada</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell align="center">Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {helpPointList.map((helpPoint) => (
                            <HelpPointLine key={helpPoint.idHelpPoint} helpPoint={helpPoint} searchHelpPoints={searchHelpPoints} />
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