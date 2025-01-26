"use client";

import React, { useState, useEffect } from "react";
import { styled } from "@mui/system";
import Pagination from "@mui/material/Pagination";

const StyledPaginationContainer = styled("div")(() => ({
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "40px",
}));

const PaginationComponent = ({ onPageChange, totalItems, itemsPerPage = 10, totalPages }) => {
    const [currentPage, setCurrentPage] = useState(1);
    totalPages= totalPages || Math.ceil(totalItems / itemsPerPage);

    const handlePageChange = (event, page) => {
        setCurrentPage(page);
        if (onPageChange) {
            onPageChange(page);
        }
    };

    useEffect(() => {
        if (onPageChange) {
            onPageChange(currentPage);
        }
    }, [currentPage, onPageChange]);

    return (
        <StyledPaginationContainer>
            <Pagination
                count={totalPages}
                page={currentPage}
                onChange={handlePageChange}
                color="primary"
                shape="rounded"
                size="large"
                showFirstButton
                showLastButton
            />
        </StyledPaginationContainer>
    );
};

export default PaginationComponent;
