import React, { useState } from "react"
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Avatar, Divider, IconButton } from "@mui/material";
import ListItemText from '@mui/material/ListItemText';
import {  Person } from "@mui/icons-material";
import { Account } from "@/@types/model";
import Stack from '@mui/material/Stack';
import { COLORS } from "@/constants/common";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import InviteDialog from "../Dialog/InvitePeople";


type ParticipantListProps={
    nameList: "Teachers"|"Students",
    hasCount: boolean,
    isStudent?: boolean,
    list: Account[]
}

const ParticipantList: React.FC<ParticipantListProps> = ({nameList, list, hasCount, isStudent=false})=>{
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
                        {nameList}
                    </Typography>

                    <IconButton sx={{color:"teal",}} onClick={handleOpen}>
                        <PersonAddAlt1OutlinedIcon/>
                    </IconButton>
                    <InviteDialog handleClose={handleClose} isOpen={open} nameDialog={hasCount?"Invite Student":"Invite Teacher"}/>

                    {hasCount && isStudent && (<Typography sx={{ mt: 2, mb: 2, color:"teal",alignItems:"center" }} variant="h6" component="div">
                        {`${list.length} students`}
                    </Typography>)}
                
                
                </Stack>
                <Divider sx={{background:"teal"}}/>
           
                <List >
                {list.map(item=>(
                    <React.Fragment key={item.id}>
                        <ListItem key={`${nameList}_${item.id}`}>
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