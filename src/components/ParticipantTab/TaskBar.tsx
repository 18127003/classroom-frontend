import { Stack, Checkbox, Button, IconButton } from "@mui/material";
import React from "react";
import { ChangePasswordDialog } from "../Dialog/ChangePasswordDialog";
import LogoutDialog from "../Dialog/LogoutDialog";
import PopupMenu from "../PopupMenu";
import PopupMenuItem from "../PopupMenu/PopupMenuItem";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';

type TaskbarProps={
    checked: boolean,
    onCheck: (value:boolean)=>void,
    disabledTask: boolean
}

const TaskBar: React.FC<TaskbarProps> = ({checked, onCheck, disabledTask})=>{
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onCheck(event.target.checked)
    };
    return (
        <Stack direction="row" spacing={2} alignItems="center" mt={2} mb={1} >
            <Checkbox onChange={handleChange} checked={checked}/>
            <PopupMenu 
                id="task-menu"
                buttonWrapperSx={{flexGrow:1}}
                button={
                    <Button 
                        disabled={disabledTask}
                        variant="outlined" 
                        endIcon={<ArrowDropDownIcon/>}
                    >
                        Task
                    </Button>
                }
            >
                <PopupMenuItem title="Send email">
                    <ChangePasswordDialog/>
                </PopupMenuItem>
                <PopupMenuItem title="Remove">
                    <LogoutDialog/>
                </PopupMenuItem>
                <PopupMenuItem title="Hide">
                    <LogoutDialog/>
                </PopupMenuItem>
            </PopupMenu>
            <IconButton>
                <SortByAlphaIcon/>
            </IconButton>
        </Stack>
    )
}

export default TaskBar;