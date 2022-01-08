import React, { useState } from "react"
import {Divider, Grid, IconButton, List, Stack, Typography } from "@mui/material";
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import InviteParticipantDialog from "../Dialog/InviteParticipantDialog";
import { ParticipantListProps } from "@/@types/props";
import TaskBar from "./TaskBar";
import ParticipantItem from "./ParticipantItem";
import useCheckboxes from "@/hooks/useCheckboxes";
 
const ParticipantList: React.FC<ParticipantListProps> = ({mode, data, hasManage=false, hasCount, hasAddIcon=false})=>{
    const [open, setOpen]=useState(false);
    const {select, getSelected, allSelected, selectAll, anySelected, getSelectedAt} = useCheckboxes(data)

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
                                    {mode}s
                                </Typography>

                                {hasCount && (
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
                                        <InviteParticipantDialog 
                                            handleClose={handleClose} 
                                            isOpen={open} 
                                            title={mode} 
                                            isStudent={mode==="Student"?true:false}
                                        />
                                    </>
                                )}
                                
                            
                            </Stack>
                            <Divider sx={{background:"teal"}}/>
                            {
                                hasManage && (
                                    <TaskBar 
                                        onCheck={selectAll} 
                                        checked={allSelected()}
                                        disabledTask={!anySelected()}
                                        getSelected={getSelected}
                                    />
                                )
                            }
                            <List >
                            {
                                data.map(item=>(
                                    <ParticipantItem 
                                        key={item.accountId}
                                        item={item} 
                                        task={hasManage}
                                        onCheck={select}
                                        checked={getSelectedAt(item.accountId)}
                                    />
                                ))
                            }
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