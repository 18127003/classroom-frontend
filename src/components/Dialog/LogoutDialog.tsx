import { LogoutDialogProps } from "@/@types/props";
import { logoutRequest } from "@/actions/auth";
import { COOKIES_AUTH_NAME } from "@/constants/common";
import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React from "react";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const LogoutDialog: React.FC<LogoutDialogProps> = ({isOpen, handleClose})=>{
    const [cookies, setCookies, removeCookies] = useCookies([COOKIES_AUTH_NAME])
    const dispatch = useDispatch()
    const handleConfirm = ()=>{
        removeCookies(COOKIES_AUTH_NAME,{'path':'/'})
        handleClose();
        dispatch(logoutRequest())
    }

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Do you want to logout?"}</DialogTitle>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleConfirm}>Confirm</Button>
            </DialogActions>
        </Dialog>
    )
}

export default LogoutDialog;