import { Account } from "@/@types/model";
import { removeParticipantsRequest, hideParticipantsRequest } from "@/actions/detail";
import { COLORS } from "@/constants/common";
import { AppState } from "@/reducers";
import { MoreVertOutlined, Person } from "@mui/icons-material";
import { Avatar, Checkbox, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Stack } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import SimpleConfirmDialog from "../Dialog/SimpleConfirmDialog";
import PopupMenu from "../PopupMenu";
import PopupMenuItem from "../PopupMenu/PopupMenuItem";

interface ParticipantItemProps {
    item: Account,
    task?: boolean,
    checked?: boolean,
    onCheck?: (id:number, value:boolean)=>void,
    key: any
}

const ParticipantItem: React.FC<ParticipantItemProps> = ({item, task=false, onCheck, checked=false})=>{
    const loading = useSelector((state:AppState)=>state.detail.loading)
    const classroom = useSelector((state:AppState)=>state.detail.detail)
    const dispatch = useDispatch()

    const onRemove = ()=>{
        dispatch(removeParticipantsRequest({
            id: classroom.id,
            participants: [item.id]
        }))
    }

    const onHide = ()=>{
        dispatch(hideParticipantsRequest({
            id: classroom.id,
            participants: [item.id]
        }))
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onCheck(item.id, event.target.checked)
    };
    return (
        <>
            <Stack direction="row" alignItems="center">
                {task&&<Checkbox onChange={handleChange} checked={checked}/>}
                <ListItem>
                    <ListItemAvatar>
                        <Avatar sx={{background: COLORS[Math.floor(Math.random()*COLORS.length)]}}>
                        <Person />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={item.name}/>
                    {item.hidden && <ListItemText primary="hidden"/>}
                </ListItem>
                {
                    task && (
                        <PopupMenu 
                            id="profile-menu"
                            button={<IconButton><MoreVertOutlined/></IconButton>}
                        >
                            <PopupMenuItem title="Send email">
                            </PopupMenuItem>
                            <PopupMenuItem title="Remove">
                                <SimpleConfirmDialog 
                                    title={`Do you want to remove ${item.name}?`} 
                                    onConfirm={onRemove}
                                    loading={loading}
                                />          
                            </PopupMenuItem>
                            <PopupMenuItem title="Hide">
                                <SimpleConfirmDialog 
                                    title={`Do you want to hide ${item.name}?`}  
                                    onConfirm={onHide}
                                    loading={loading}
                                />
                            </PopupMenuItem>
                        </PopupMenu>
                    )
                }
                
            </Stack>
           
            <Divider/>
        </>
    )
}

export default ParticipantItem;