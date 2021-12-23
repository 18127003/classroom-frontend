import { AppState } from "@/reducers";
import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import Transition from "../Transition";

type InvitationRespondDialogProps = {
    handleAccept: ()=>void,
    role?: "Student"|"Teacher"
}

const InvitationRespondDialog: React.FC<InvitationRespondDialogProps> = ({handleAccept, role="Student"}) =>{
    const loading = useSelector((state: AppState)=>state.classrooms.loading)
    const account = useSelector((state:AppState)=>state.account.detail)
    return (
        <>
            <Dialog
                open={true}
                TransitionComponent={Transition}
                keepMounted
                aria-describedby="accept-invitation-dialog"
            >
                <DialogTitle>{role} Invitation</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                            {`Do you want to accept class invitation as ${account?account.name:''}?`}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <LoadingButton onClick={handleAccept} loading={loading} disabled={loading}>Accept</LoadingButton>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default InvitationRespondDialog;