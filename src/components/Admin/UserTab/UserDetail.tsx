import { Account } from "@/@types/model";
import { Block, ExpandMore, MapOutlined } from "@mui/icons-material";
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

interface UserDetailProps{
    user:Account
}
const UserDetail:React.FC<UserDetailProps>=({user})=>{
    return (
        <Card sx={{  }}>
      <CardHeader
        avatar={
          <Avatar sx={{}} aria-label="recipe">
            {user.name.slice(0,2)}
          </Avatar>
        }
        action={
          <>
          {user.studentId?
          (<IconButton aria-label="map"><MapOutlined /></IconButton>)
          :(<IconButton aria-label="map"><MapOutlined /></IconButton>)
          }
          <IconButton aria-label="ban">
              <Block />
          </IconButton></>
        }
        title={user.name}
        subheader={user.studentId??''}
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