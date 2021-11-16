import { IconButton } from "@mui/material";
import GoogleIcon from '@mui/icons-material/Google';
import React from "react";
import { useGoogleLogin } from "react-google-login";
import { GOOGLE_AUTH_CLIENT_ID } from "@/constants/common";
import { useDispatch } from "react-redux";
import { socialLoginRequest } from "@/actions/auth";
import googleLogo from "@/assets/google.png";

const GoogleLoginButton = () => {
    const dispatch = useDispatch();
    const onSuccess = (res)=>{
        dispatch(socialLoginRequest(res.tokenId))
    }

    const onFailure = (res)=>{
        console.log('Failed',res)
    }

    const {signIn}=useGoogleLogin({
        onSuccess,
        onFailure,
        clientId: GOOGLE_AUTH_CLIENT_ID,
        isSignedIn: false,
        accessType: 'offline'
    })
    
    return(
        <IconButton onClick={signIn}>
            <img src={googleLogo}/>
        </IconButton>
    )
}

export default GoogleLoginButton;