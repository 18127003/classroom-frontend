import { Account, Classroom } from "@/@types/model";
import { Block, ExpandMore } from "@mui/icons-material";
import { Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, CardActions } from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";

interface ClassroomDetailProps{
    classroom:Classroom
}
const ClassDetail:React.FC<ClassroomDetailProps>=({classroom})=>{
    return (
        <Card sx={{  }}>
      <CardHeader
        action={
          <IconButton aria-label="ban">
            <Block />
          </IconButton>
        }
        title={classroom.name}
      />
      
      <CardContent>
          {classroom.code&&( <Typography variant="body2" color="text.secondary">
          {`Code: ${classroom.code}`}
        </Typography>)}
        {classroom.description&&(<Typography variant="body2" color="text.secondary">
          {`Description: ${classroom.description}`}
        </Typography>)}
        {classroom.topic&&(<Typography variant="body2" color="text.secondary">
          {`Topic: ${classroom.topic}`}
        </Typography>)}
        {classroom.room&&(<Typography variant="body2" color="text.secondary">
          {`Room: ${classroom.room}`}
        </Typography>)}
        {classroom.part&&(<Typography variant="body2" color="text.secondary">
          {`Part: ${classroom.part}`}
        </Typography>)}
      </CardContent>
      </Card>
    )
}
export default ClassDetail