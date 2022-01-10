import React, { ReactElement, useState } from "react"
import SimpleConfirmDialog from "../Dialog/SimpleConfirmDialog"

interface DialogButtonProps {
    onConfirm: ()=>void,
    children: ReactElement,
    dialogContent: string
}

const DialogButton: React.FC<DialogButtonProps> = ({children, onConfirm, dialogContent})=>{
    const [confirm, setConfirm] = useState(false)

    const onClose = ()=>{setConfirm(false)}

    const onOpen = ()=>{setConfirm(true)}

    return (
        <>
            {
                React.cloneElement(children, {onClick: onOpen})
            }
            <SimpleConfirmDialog 
                isOpen={confirm}
                handleClose={onClose}
                title={dialogContent} 
                onConfirm={onConfirm}
            />
        </>
    )
}

export default DialogButton