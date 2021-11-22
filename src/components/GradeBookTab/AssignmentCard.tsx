import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {  Avatar, CardHeader } from '@mui/material';
import { AssignmentCardProps } from '@/@types/props';
import {  AssignmentIndRounded } from '@mui/icons-material';


const AssignmentCard:React.FC<AssignmentCardProps>=({assignment,onEdit, index})=> {

    const onClick = ()=>{
        if(onEdit){
            onEdit(index)
        }
    }

    return (
        <Card sx={{width:"90%"}} onClick={onClick}>
            <CardHeader
                avatar={<Avatar sx={{background:"teal"}}><AssignmentIndRounded/></Avatar>}
                title={
                    `${assignment.creator} has posted a new assignment: ${assignment.name}`
                }
                subheader={
                    `Points: ${assignment.points}`
                }
                >
            </CardHeader>
        <CardContent>
            
            
        </CardContent>
        </Card>
    );
}
export default AssignmentCard
