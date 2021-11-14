import BasicAppBar from "@/components/BasicAppBar"
import ClassroomsGrid from "@/components/ClassroomGrid"
import { LinearProgress } from "@mui/material"
import AddIcon from '@mui/icons-material/Add'
import React from "react"
import { useSelector } from "react-redux"
import { AppState } from "@/reducers"
import PopupMenu from "@/components/PopupMenu"
import PopupMenuItem from "@/components/PopupMenu/PopupMenuItem"
import { CreateClassDialog } from "@/components/Dialog/CreateClassdialog"
import JoinClassDialog from "@/components/Dialog/JoinClassDialog"
import { Redirect } from "react-router"

const HomePage = ()=>{
    const loading = useSelector((state: AppState)=>state.classrooms.loading);
    const redirect = useSelector((state: AppState)=>state.detail.redirect);
    const detail = useSelector((state: AppState)=>state.detail.detail);
    
    if(redirect){
        return <Redirect to={{
            'pathname': `/classroom/${detail.id}`,
            'state':detail
        }}/>
    }
    return (
        <>
            <BasicAppBar>
                <PopupMenu
                    id="classroom-menu"
                    icon={<AddIcon />}
                    iconSz={{
                    size:"large",
                    edge:"start",
                    color:"inherit",
                    sx:{ mr: 2 }
                    }}
                >
                    <PopupMenuItem title="Create Class">
                        <CreateClassDialog/>
                    </PopupMenuItem>
                    <PopupMenuItem title="Join Class">
                        <JoinClassDialog/>
                    </PopupMenuItem>
                </PopupMenu>
            </BasicAppBar>
            <LinearProgress sx={loading?{}:{display: 'none'}}/>
            <ClassroomsGrid/>
        </>
    )
}

export default HomePage