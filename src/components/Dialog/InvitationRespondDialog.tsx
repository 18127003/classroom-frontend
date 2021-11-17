import { AppState } from "@/reducers";
import { LoadingButton } from "@mui/lab";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { useSelector } from "react-redux";

type InvitationRespondDialogProps = {
    handleAccept: ()=>void,
    role?: "Student"|"Teacher"
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="down" ref={ref} {...props} />;
});

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