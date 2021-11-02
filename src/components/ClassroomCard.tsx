import React from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { ClassroomCardProps } from "@/@types/props";
import { Divider, IconButton, Tooltip } from "@mui/material";
import { FolderOutlined } from "@mui/icons-material";

const ClassroomCard: React.FC<ClassroomCardProps> = ({classroom})=>{
    
    return (
        // <Box sx={{ minWidth: 275 }} height='100%'>
            <Card variant="outlined" sx={{'&:hover':{boxShadow: '0 8px 24px 0 rgba(0,0,0,0.12)'},height:'100%'}}>
                <CardContent sx={{background:'rgba(0, 128, 0, 0.3)', height:'20%'}}>
                    <Typography variant="h5" component="div">
                        {classroom.name}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {classroom.part}
                    </Typography>
                </CardContent>
                <CardContent sx={{height:'30%'}}>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {classroom.topic}
                    </Typography>
                    <Typography variant="body2">
                        {classroom.room}
                    </Typography>
                </CardContent>
                <Divider/>
                <CardActions sx={{display:'flex', justifyContent:'flex-end'}}>
                    <Tooltip title="Open directory">
                        <IconButton size="small"><FolderOutlined/></IconButton>
                    </Tooltip>
                </CardActions>
            </Card>
        // </Box>
    )
}
export default ClassroomCard;



