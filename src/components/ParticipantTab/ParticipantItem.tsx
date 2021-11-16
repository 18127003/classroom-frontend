import { Account } from "@/@types/model";
import { COLORS } from "@/constants/common";
import { MoreVertOutlined, Person } from "@mui/icons-material";
import { Avatar, Checkbox, Divider, IconButton, ListItem, ListItemAvatar, ListItemText, Stack } from "@mui/material";
import React from "react";
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
                            </PopupMenuItem>
                            <PopupMenuItem title="Hide">
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