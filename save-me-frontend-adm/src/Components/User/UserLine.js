import React from "react";
import Link from "next/link";
import { AiFillEdit, AiFillEye } from "react-icons/ai";
import DeleteUser from "./DeleteUser";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import StatusChip from "../BasicComponents/StatusChip";

export default function UserLine({ user, searchUsers }) {
    return (
        <TableRow>
            <TableCell component="th" scope="row">
                {user.idUser}
            </TableCell>
            <TableCell>{user.userFullName}</TableCell>
            <TableCell>{user.userEmail}</TableCell>
            <TableCell>
                <StatusChip status={user.userStatus} />
            </TableCell>
            <TableCell>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <Tooltip title="Visualizar detalhes do usuário" arrow>
                        <IconButton
                            color="success"
                            component={Link}
                            href={`/Users/${user.idUser}`}
                        >
                            <AiFillEye />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Editar informações do usuário" arrow>
                        <IconButton
                            color="primary"
                            component={Link}
                            href={`/Users/update/${user.idUser}`}
                        >
                            <AiFillEdit />
                        </IconButton>
                    </Tooltip>

                    <Tooltip title="Deletar usuário permanentemente" arrow>
                        <DeleteUser idUser={user.idUser} searchUsers={searchUsers} />
                    </Tooltip>
                </div>
            </TableCell>
        </TableRow>
    );
}
