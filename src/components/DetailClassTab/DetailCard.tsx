import { DetailCardProps } from "@/@types/props";
import { InfoRounded } from "@mui/icons-material";
import { Card, CardContent, Typography, CardActions, Collapse } from "@mui/material";
import React from "react";
import ExpandMore from "../ExpandMore";

const DetailCard: React.FC<DetailCardProps> = ({detailClass})=>{
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
      }; 

    return (
        <Card
            sx={{ background: "rgba(0, 128, 0, 0.3)" }}
        >
            <CardContent sx={{minHeight:"150px"}}>
            <Typography variant="h4" component="div">
                {detailClass.name}
            </Typography>
            <Typography variant="h5" >
                {detailClass.part}
            </Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ }}>
            <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                >
                <InfoRounded />
            </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent sx={{background:"white"}}>
            {detailClass.role==="TEACHER"&&(<Typography paragraph>Classroom code: {detailClass.code}</Typography>)}
            {detailClass.topic&&(<Typography paragraph>{`Topic: ${detailClass.topic}`}</Typography>)}
            {detailClass.description&&(<Typography paragraph> {`Description: ${detailClass.description}`}</Typography>)}
            {detailClass.room&&(<Typography paragraph>{`Room: ${detailClass.room}`}</Typography>)}
            </CardContent>
            </Collapse>
        </Card>
    )
}

export default DetailCard;