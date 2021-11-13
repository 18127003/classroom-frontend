import { Button } from "@mui/material";
import React from "react";

type InvitationRespondDialogProps = {
    handleAccept: ()=>void
}

const InvitationRespondDialog: React.FC<InvitationRespondDialogProps> = ({handleAccept}) =>{
    return (
        <>
            <div>Invite Page</div>
            <Button onClick={handleAccept}>Accept</Button>
        </>
    )
}

export default InvitationRespondDialog;