import useAdminAccount from "@/hooks/useAdminAccount"
import { IconButton } from "@mui/material"
import React from "react"
import UpdateStudentIDDialog from "../Dialog/UpdateStudentIDDialog"
import PopupMenu from "../PopupMenu"
import PopupMenuItem from "../PopupMenu/PopupMenuItem"
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SimpleConfirmDialog from "../Dialog/SimpleConfirmDialog"
import { Account } from "@/@types/model"

interface UserActionButtonProps {
    account: Account
}

const UserActionButton: React.FC<UserActionButtonProps> = ({account})=>{
    const {lockAccount, mapStudentId, removeStudentId} = useAdminAccount()

    const onUpdate = (studentId:string, name:string)=>{
        mapStudentId(account.id, {
            studentId,
            name
        })
    }

    const onRemove = () => {
        removeStudentId(account.id)
    }

    const onLock = () => {
        lockAccount(account.id)
    }

    return (
        <PopupMenu 
            id="account-action"
            button={<IconButton><MoreVertIcon/></IconButton>}
        >
            <PopupMenuItem title="Lock Account">
                <SimpleConfirmDialog title={`Do you want to lock account email ${account.email}?`} onConfirm={onLock}/>
            </PopupMenuItem>
            {
                account.studentId?
                (
                    <PopupMenuItem title="Remove Student ID">
                        <SimpleConfirmDialog 
                            title={`Do you want to remove student ID of account email ${account.email}?`} 
                            onConfirm={onRemove}
                        />
                    </PopupMenuItem>
                ):(
                    <PopupMenuItem title="Map Student ID">
                        <UpdateStudentIDDialog onUpdate={onUpdate}/>
                    </PopupMenuItem>
                )
            }
            
        </PopupMenu>
    )
}

export default UserActionButton