import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ClassroomCardProps } from "@/@types/props";

const ClassroomCard: React.FC<ClassroomCardProps> = ({classroom})=>{
    
    return (
        <Box sx={{ minWidth: 275 }}>
            <Card variant="outlined">
                <React.Fragment>
                    <CardContent>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {classroom.name}
                    </Typography>
                    <Typography variant="h5" component="div">
                        {classroom.part}
                    </Typography>
                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                        {classroom.topic}
                    </Typography>
                    <Typography variant="body2">
                        {classroom.room}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Button size="small">Learn More</Button>
                    </CardActions>
                </React.Fragment>
            </Card>
        </Box>
    )
}
export default ClassroomCard;



