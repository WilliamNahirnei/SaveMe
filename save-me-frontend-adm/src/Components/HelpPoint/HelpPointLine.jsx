import React from "react";
import Link from "next/link";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export default function HelpPointLine({ helpPoint, searchUsers }) {
    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {helpPoint.idHelpPoint}
            </TableCell>
            <TableCell>{helpPoint.numberPeople}</TableCell>
            <TableCell>{helpPoint.numberAnimals}</TableCell>
            <TableCell>{helpPoint.details}</TableCell>
            <TableCell>{(new Date(helpPoint.dateHour)).toLocaleString("pt-BR")}</TableCell>
            <TableCell>{helpPoint.idStatus}</TableCell>
            <TableCell>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <Tooltip title="Visualizar detalhes do pedido" arrow>
                        <IconButton
                            color="success"
                            component={Link}
                            href={`/Users/${helpPoint.idUser}`}
                        >
                            <AiFillEye />
                        </IconButton>
                    </Tooltip>
                </div>
            </TableCell>
        </TableRow>
    );
}