import { Account } from "@/@types/model";
import { Block, Check, ExpandMore } from "@mui/icons-material";
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

interface AdminDetailProps{
    user:Account
}
const AdminDetail:React.FC<AdminDetailProps>=({user})=>{
    return (
        <Card sx={{  }}>
      <CardHeader
        avatar={
          <Avatar sx={{}} aria-label="recipe">
            {user.name.slice(0,2)}
          </Avatar>
        }
        action={
          <IconButton aria-label="ban">
            <Check />
          </IconButton>
        }
        title={user.name}
      />
      
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {user.email}
        </Typography>
      </CardContent>
      </Card>
    )
}
export default AdminDetail