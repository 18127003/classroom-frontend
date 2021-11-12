import React, { useState } from "react"
import { Avatar, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, Typography } from "@mui/material";
import {  Person } from "@mui/icons-material";
import { COLORS } from "@/constants/common";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import InviteDialog from "../Dialog/InviteParticipantDialog";
import { ParticipantListProps } from "@/@types/props";

const ParticipantList: React.FC<ParticipantListProps> = ({title, list, hasCount, isStudent=false})=>{
    const [open, setOpen]=useState(false);

    const handleOpen = ()=>{
        setOpen(true)
    }

    const handleClose = ()=>{
        setOpen(false)
    }

    return (
        <Grid container spacing={2} sx={{flexGrow:1, justifyContent:'center'}} columns={{ xs: 4, sm: 8, md: 12 }}>
            <Grid item xs={3} sm={6} md={6}>
                <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" > 
                    <Typography sx={{ mt: 2, mb: 2, color:"teal",alignItems:"center" }} variant="h5" component="div">
                        {title}
                    </Typography>

                    <IconButton sx={{color:"teal",}} onClick={handleOpen}>
                        <PersonAddAlt1OutlinedIcon/>
                    </IconButton>
                    <InviteDialog handleClose={handleClose} isOpen={open} title={hasCount?"Invite Student":"Invite Teacher"}/>

                    {hasCount && isStudent && (<Typography sx={{ mt: 2, mb: 2, color:"teal",alignItems:"center" }} variant="h6" component="div">
                        {`${list.length} students`}
                    </Typography>)}
                
                
                </Stack>
                <Divider sx={{background:"teal"}}/>
           
                <List >
                {list.map(item=>(
                    <React.Fragment key={item.id}>
                        <ListItem>
                            <ListItemAvatar>
                                <Avatar sx={{background: COLORS[Math.floor(Math.random()*COLORS.length)]}}>
                                <Person />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={item.name}/>
                        </ListItem>
                        <Divider/>
                    </React.Fragment>
                     
                ))}
                </List>
            </Grid>
        </Grid>
    )
}

export default ParticipantList;