import { SimpleConfirmDialogProps } from "@/@types/props"
import { LoadingButton } from "@mui/lab";
import { Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import React from "react";
import Transition from "../Transition";

const SimpleConfirmDialog: React.FC<SimpleConfirmDialogProps> = ({isOpen, handleClose, title, onConfirm, loading})=>{

    const handleConfirm = ()=>{
        onConfirm();
        handleClose();
    }

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{title}</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <LoadingButton onClick={handleConfirm} loading={loading} disabled={loading}>Confirm</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default SimpleConfirmDialog;