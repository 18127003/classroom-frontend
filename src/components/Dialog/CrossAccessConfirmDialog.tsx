import { logoutRequest } from "@/actions/auth";
import { AppState } from "@/reducers";
import { LoadingButton } from "@mui/lab";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Transition from "../Transition";

type CrossAccessConfirmDialogProps = {
    access: 'Admin'|'User'
}

const CrossAccessConfirmDialog: React.FC<CrossAccessConfirmDialogProps> = ({access}) =>{
    const loading = useSelector((state: AppState)=>state.auth.loading)
    const dispatch = useDispatch();

    const handleAccept = ()=>{
        dispatch(logoutRequest())
    }

    return (
        <Dialog
            open={true}
            TransitionComponent={Transition}
            keepMounted
            aria-describedby="cross-access-dialog"
        >
            <DialogTitle>Access Denied</DialogTitle>
            <DialogContent>
                <DialogContentText>
                        {`This page need ${access} privilege to access, consider using another account!`}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button>Go back</Button>
                <LoadingButton onClick={handleAccept} loading={loading} disabled={loading}>{`Go as ${access}`}</LoadingButton>
            </DialogActions>
        </Dialog>
    )
}

export default CrossAccessConfirmDialog;