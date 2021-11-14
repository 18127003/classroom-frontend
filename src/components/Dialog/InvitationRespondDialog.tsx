import { AppState } from "@/reducers";
import { Button, CircularProgress } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";

type InvitationRespondDialogProps = {
    handleAccept: ()=>void
}

const InvitationRespondDialog: React.FC<InvitationRespondDialogProps> = ({handleAccept}) =>{
    const loading = useSelector((state: AppState)=>state.detail.loading)
    return (
        <>
            <div>Invite Page</div>
            <Button onClick={handleAccept}>Accept</Button>
            <CircularProgress sx={loading?{}:{display: 'none'}}/>
        </>
    )
}

export default InvitationRespondDialog;