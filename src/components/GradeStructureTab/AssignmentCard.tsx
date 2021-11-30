import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import {  Avatar, CardHeader, Divider } from '@mui/material';
import { AssignmentCardProps } from '@/@types/props';
import {  AssignmentIndRounded } from '@mui/icons-material';
import parse from "html-react-parser";


const AssignmentCard:React.FC<AssignmentCardProps>=({assignment,onEdit, index, fullWidth=true})=> {

    const onClick = ()=>{
        if(onEdit){
            onEdit(index)
        }
    }

    return (
        <Card sx={fullWidth?{}:{width:"90%"}} onClick={onClick}>
            <CardHeader
                avatar={<Avatar sx={{background:"teal"}}><AssignmentIndRounded/></Avatar>}
                title={
                    `${assignment.creator} has posted a new assignment: ${assignment.name}`
                }
                subheader={
                    (<>
                        {`Points: ${assignment.points}`}
                        <br/>
                        {assignment.deadline && `Deadline: ${new Date(assignment.deadline).toLocaleString()}`}
                    </>)
                }
                >
            </CardHeader>
            {assignment.description&&(
                <>
                <Divider/>
                <CardContent>
                    {parse(assignment.description??'')}
                </CardContent>
                </>
            )}
           
        </Card>
    );
}
export default AssignmentCard
