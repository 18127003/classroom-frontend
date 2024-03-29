import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ClassroomCardProps } from "@/@types/props";
import { Divider, IconButton, Tooltip } from "@mui/material";
import { AssignmentOutlined, FolderOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const ClassroomCard: React.FC<ClassroomCardProps> = ({classroom})=>{
    
    return (
        <Card sx={{height:"100%", minHeight:"300px",'&:hover':{boxShadow: '0 8px 24px 0 rgba(0,0,0,0.12)'}}}>
            <CardContent sx={{background:'rgba(0, 128, 0, 0.3)',height:"30%"}}>
                <Link 
                    to={{
                        pathname: `/classroom/${classroom.id}`,
                        state: classroom
                    }} 
                    style={{color:'white', textDecoration:'none'}}
                >
                    <Typography gutterBottom variant="h5" component="div">
                    {classroom.name}
                    </Typography>
                </Link>
                <Typography variant="body2" color="white">
                    {classroom.part?classroom.part:''}
                </Typography>
                <Typography variant="body1" color="white" sx={{
                            position: 'sticky',
                            top: '45%'
                        }}>
                    {classroom.role==='STUDENT'?classroom.creator:''}
                </Typography>
            </CardContent>
            <CardContent sx={{height:"30%"}} >
                <Typography gutterBottom variant="body2" color="text.secondary">
                {classroom.description}
                </Typography>
            </CardContent>
            <Divider/>
            <CardActions sx={{display:'flex', justifyContent:'flex-end'}}>
            <Tooltip title="Open assignment">
                    <IconButton size="small"><AssignmentOutlined/></IconButton>
                </Tooltip>
                <Tooltip title="Open directory">
                    <IconButton size="small"><FolderOutlined/></IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    )
}
export default ClassroomCard;



