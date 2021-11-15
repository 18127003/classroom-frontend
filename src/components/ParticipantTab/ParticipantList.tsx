import React, { useState } from "react"
import { Avatar, Checkbox, Divider, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Stack, TextField, Typography } from "@mui/material";
import {  Person } from "@mui/icons-material";
import { COLORS } from "@/constants/common";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import InviteDialog from "../Dialog/InviteParticipantDialog";
import { ParticipantListProps } from "@/@types/props";

const ParticipantList: React.FC<ParticipantListProps> = ({title, data, hasCount, hasAddIcon=false})=>{
    const [open, setOpen]=useState(false);

    const handleOpen = ()=>{
        setOpen(true)
    }

    const handleClose = ()=>{
        setOpen(false)
    }

    return (
        <>
            {
                (data.length > 0 || hasAddIcon) && (
                    <Grid container spacing={2} sx={{flexGrow:1, justifyContent:'center'}} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid item xs={3} sm={6} md={6}>
                            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" > 
                                <Typography 
                                    sx={{ mt: 2, mb: 2, color:"teal",alignItems:"center", flexGrow:1 }} 
                                    variant="h5" 
                                    component="div"
                                >
                                    {title}
                                </Typography>

                                {hasCount && data.length>0 && (
                                    <Typography 
                                        sx={{ mt: 2, mb: 2, color:"teal",alignItems:"center" }} 
                                        variant="h6" 
                                        component="div"
                                    >
                                        {`${data.length} students`}
                                    </Typography>
                                )}

                                {hasAddIcon && (
                                    <>
                                        <IconButton sx={{color:"teal",}} onClick={handleOpen}>
                                            <PersonAddAlt1OutlinedIcon/>
                                        </IconButton>
                                        <InviteDialog 
                                            handleClose={handleClose} 
                                            isOpen={open} 
                                            title={hasCount?"Invite Student":"Invite Teacher"} 
                                            isStudent={hasCount}
                                        />
                                    </>
                                )}
                                
                            
                            </Stack>
                            <Divider sx={{background:"teal"}}/>
                            <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center" >
                                <Checkbox/>
                                {/* <TextField
                                    id="outlined-select-currency"
                                    select
                                    label="Select"
                                    value={currency}
                                    onChange={handleChange}
                                    helperText="Please select your currency"
                                    >
                                    {currencies.map((option) => (
                                        <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                        </MenuItem>
                                    ))}
                                </TextField> */}
                            </Stack>
                            <List >
                            {data.map(item=>(
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
                            {
                                data.length===0 && hasAddIcon && (<Typography variant="body2">Invite a student for your class</Typography>)
                            }
                        </Grid>
                    </Grid>
                )
            }
        </>
        
    )
}

export default ParticipantList;