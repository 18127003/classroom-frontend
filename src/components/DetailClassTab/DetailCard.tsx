import { DetailCardProps } from "@/@types/props";
import { InfoRounded } from "@mui/icons-material";
import { Card, CardContent, Typography, CardActions, Collapse, Box, Grid } from "@mui/material";
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
            <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="flex-end"
                sx={{minHeight:"150px"}}
                m={2}
                columns={{md:12, sm:8, xs:4}}
            >
                <Grid item md={10} sm={6}>
                    <Typography variant="h4" component="div" noWrap>
                        {detailClass.name}
                    </Typography>
                    <Typography variant="h5" noWrap>
                        {detailClass.part}
                    </Typography>
                </Grid>
                <Grid item md={2} sm={2} xs={1}>
                    <CardActions disableSpacing sx={{mr:2}}>
                        <ExpandMore
                            expand={expanded}
                            onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <InfoRounded/>
                        </ExpandMore>
                    </CardActions>
                </Grid>
            </Grid> 
            
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