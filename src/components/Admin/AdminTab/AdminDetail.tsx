import { Account } from "@/@types/model";
import SimpleConfirmDialog from "@/components/Dialog/SimpleConfirmDialog";
import useAdminAdmin from "@/hooks/useAdminAdmin";
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import { Card, CardHeader, Avatar, IconButton, CardContent, Typography } from "@mui/material";
import PermIdentityRoundedIcon from '@mui/icons-material/PermIdentityRounded';
import React, { useState } from "react";

interface AdminDetailProps {
  user: Account
}
const AdminDetail: React.FC<AdminDetailProps> = ({ user }) => {
  const [confirm, setConfirm] = useState(false)
  const {activateAdmin} = useAdminAdmin()

  const onClose = ()=>{setConfirm(false)}

  const onOpen = ()=>{setConfirm(true)}

  const onConfirm = ()=>{
    activateAdmin(user.email)
  }

  return (
    <>
      <Card>
        <CardHeader
          avatar={
            <Avatar aria-label="name">
              {user.name.slice(0, 2)}
            </Avatar>
          }
          action={
            user.status==='ACTIVATED'?<HowToRegRoundedIcon />:
            (<IconButton aria-label="activate" onClick={onOpen}>
              <PermIdentityRoundedIcon />
            </IconButton>)
          }
          title={user.name}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {user.email}
          </Typography>
        </CardContent>
      </Card>
      <SimpleConfirmDialog 
        isOpen={confirm}
        handleClose={onClose}
        title={`Do you want to activate admin email ${user.email}?`} 
        onConfirm={onConfirm} 
        loading={false}
      />
    </>
    
  )
}
export default AdminDetail