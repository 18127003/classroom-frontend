import { Account } from "@/@types/model";
import UserActionButton from "@/components/Button/UserActionButton";
import { Card, CardHeader, Avatar, CardContent, Typography } from "@mui/material";
import React from "react";

interface UserDetailProps {
  user: Account
}

const UserDetail: React.FC<UserDetailProps> = ({ user }) => {

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar aria-label="user-avatar">
            {user.name.slice(0, 2)}
          </Avatar>
        }
        action={
          <UserActionButton account={user}/>
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
export default UserDetail