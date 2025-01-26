"use client";

import React from "react";
import { Box, TextField, Grid, FormControl, InputLabel, Select, MenuItem, Button } from "@mui/material";

export default function UserFilters({ filters, onInputChange, onSubmit, onClear }) {
    return (
        <Box component="form" onSubmit={onSubmit} sx={{ mb: 3 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Nome"
                        value={filters.userFullName}
                        onChange={(e) => onInputChange("userFullName", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        type="date"
                        label="Data de Nascimento Igual"
                        InputLabelProps={{ shrink: true }}
                        value={filters.userBirthDateEqual}
                        onChange={(e) => onInputChange("userBirthDateEqual", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        type="date"
                        label="Data de Nascimento Maior que"
                        InputLabelProps={{ shrink: true }}
                        value={filters.userBirthDateGreaterThan}
                        onChange={(e) => onInputChange("userBirthDateGreaterThan", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        type="date"
                        label="Data de Nascimento Menor que"
                        InputLabelProps={{ shrink: true }}
                        value={filters.userBirthDateLessThan}
                        onChange={(e) => onInputChange("userBirthDateLessThan", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <TextField
                        fullWidth
                        label="Email"
                        value={filters.userEmail}
                        onChange={(e) => onInputChange("userEmail", e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4}>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={filters.userStatus}
                            onChange={(e) => onInputChange("userStatus", e.target.value)}
                        >
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="active">Ativo</MenuItem>
                            <MenuItem value="inactive">Inativo</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Button variant="contained" color="primary" type="submit" fullWidth>
                                Aplicar Filtros
                            </Button>
                        </Grid>
                        <Grid item xs={6}>
                            <Button variant="outlined" color="secondary" onClick={onClear} fullWidth>
                                Limpar Filtros
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}
