"use client";

import { Chip, Grid } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";
import React from "react";

export default function StatusChip(props) {
    const { status } = props;
    const isActive = () => status === "active";

    return (
        <Grid container spacing={2} alignItems="center">
            <Chip
                label={isActive() ? "Ativo" : "Inativo"}
                color={isActive() ? "success" : "error"}
                icon={isActive() ? <CheckCircle /> : <Cancel />}
                sx={{ fontSize: "16px", fontWeight: "bold" }}
            />
        </Grid>
    );
}
