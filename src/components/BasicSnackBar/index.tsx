import { Snackbar, Alert } from "@mui/material"
import React, { useEffect, useState } from "react"

interface BasicSnackBarProps {
    type: "success"|"error",
    msg: string | null
}

const BasicSnackBar: React.FC<BasicSnackBarProps> = ({type, msg})=>{
    const [open, setOpen]=useState(false)

    const handleClose = ()=>{setOpen(false)}

    useEffect(()=>{
        if(msg){
            setOpen(true)
        }
    },[msg])

    return (
        <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
            {msg}
            </Alert>
        </Snackbar>
    )

}

export default BasicSnackBar