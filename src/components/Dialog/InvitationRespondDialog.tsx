import { AppState } from "@/reducers";
import { Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Slide, Typography } from "@mui/material";
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
    const loading = useSelector((state: AppState)=>state.detail.loading)
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
                    <CircularProgress sx={loading?{}:{display: 'none'}}/>
                    <Button onClick={handleAccept}>Accept</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default InvitationRespondDialog;