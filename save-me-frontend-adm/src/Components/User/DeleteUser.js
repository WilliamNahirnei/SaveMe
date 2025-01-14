import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip'; // Tooltip importado
import { useSnackbar } from "notistack";
import { BsFillTrashFill } from 'react-icons/bs';

import { deleteUser } from '../../api/user-api';

export default function DeleteUser(props) {
    const idUser = props.idUser;
    const searchUsers = props.searchUsers;

    const [open, setOpen] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    async function callDeleteUser() {
        handleClose();
        try {
            await deleteUser(idUser);
            positiveNotify();
            searchUsers();
        } catch (e) {
            if (e?.response?.data?.messages?.length > 0) {
                e?.response?.data?.messages?.forEach(message => {
                    negativeNotify(message);
                });
            } else {
                negativeNotify('Erro ao deletar usuario');
            }
        }
    }

    const positiveNotify = () => {
        enqueueSnackbar('Usuario Deletado', {
            variant: "success",
            autoHideDuration: 5000
        });
    };

    const negativeNotify = (errorMessage = '') => {
        enqueueSnackbar(`Erro ao deletar o usuario. ${errorMessage}`, {
            variant: "error",
            autoHideDuration: 5000
        });
    };

    return (
        <div>
            {/* Adicionando Tooltip ao botão de deletar */}
            <Tooltip title="Deletar usuario">
                <IconButton color="error" onClick={handleClickOpen}>
                    <BsFillTrashFill size={24} />
                </IconButton>
            </Tooltip>
            
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Você tem certeza que quer deletar este usuario"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Deletar um usuario é irreversível, todos os dados serão perdidos.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancelar</Button>
                    <Button variant="outlined" color="error" onClick={callDeleteUser} autoFocus>
                        Deletar
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
