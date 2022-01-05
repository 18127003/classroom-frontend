import { Stack, Checkbox, Button, IconButton } from "@mui/material";
import React from "react";
import PopupMenu from "../PopupMenu";
import PopupMenuItem from "../PopupMenu/PopupMenuItem";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import SortByAlphaIcon from '@mui/icons-material/SortByAlpha';
import { useDispatch, useSelector } from "react-redux";
import { AppState } from "@/reducers";
import { hideParticipantsRequest, removeParticipantsRequest } from "@/actions/detail";
import SimpleConfirmDialog from "../Dialog/SimpleConfirmDialog";

type TaskbarProps={
    checked: boolean,
    onCheck: (value:boolean)=>void,
    disabledTask: boolean,
    getSelected: ()=>number[]
}

const TaskBar: React.FC<TaskbarProps> = ({checked, onCheck, disabledTask, getSelected})=>{
    const dispatch = useDispatch();
    const classroom = useSelector((state:AppState)=>state.detail.detail)
    const loading = useSelector((state:AppState)=>state.detail.loading)
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onCheck(event.target.checked)
    };

    const onRemove = ()=>{
        dispatch(removeParticipantsRequest({
            id: classroom.id,
            participants: getSelected()
        }))
    }

    const onHide = ()=>{
        dispatch(hideParticipantsRequest({
            id: classroom.id,
            participants: getSelected()
        }))
    }

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
                </PopupMenuItem>
                <PopupMenuItem title="Remove">
                    <SimpleConfirmDialog 
                        title="Do you want to remove selected students?" 
                        onConfirm={onRemove}
                        loading={loading}
                    />
                </PopupMenuItem>
                <PopupMenuItem title="Hide">
                    <SimpleConfirmDialog 
                        title="Do you want to hide selected students?" 
                        onConfirm={onHide}
                        loading={loading}
                    />
                </PopupMenuItem>
            </PopupMenu>
            <IconButton>
                <SortByAlphaIcon/>
            </IconButton>
        </Stack>
    )
}

export default TaskBar;