import { Account } from "@/@types/model"
import DialogButton from "@/components/Button/DialogButton"
import LockOpenIcon from '@mui/icons-material/LockOpen'
import { Card, CardHeader, Avatar, CardContent, Typography, IconButton } from "@mui/material"
import React from "react"

interface BlacklistDetailProps {
    user: Account,
    onUnlock: (accountId:string)=>void
  }
  
  const BlacklistDetail: React.FC<BlacklistDetailProps> = ({ user, onUnlock }) => {

    const onConfirm = ()=>{
        onUnlock(user.id)
    }

    return (
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="user-avatar">
              {user.name.slice(0, 2)}
            </Avatar>
          }
          action={
            <DialogButton 
                onConfirm={onConfirm} 
                dialogContent={`Do you want to unlock account email ${user.email}?`}            
            >
                <IconButton>
                    <LockOpenIcon/>
                </IconButton>
            </DialogButton>
          }
          title={user.name}
          subheader={user.studentId ?? ''}
        />
  
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </CardContent>
      </Card>
    )
  }
  export default BlacklistDetail