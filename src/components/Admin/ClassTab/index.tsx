import useAdminClassroom from "@/hooks/useAdminClassroom";
import React from "react";
import AdminTabItem from "../AdminTabItem";
import AdminListItem from "../AdminTabItem/ListItem";
import ClassDetail from "./ClassDetail";

const ClassTab:React.FC=()=>{
    const {classrooms}=useAdminClassroom()
    const listName="Classes list"

    return(
        <AdminTabItem listName={listName}>
            {classrooms.map(classroom=>(
                <AdminListItem key={classroom.id} content={classroom.name}>
                    <ClassDetail classroom={classroom}/>
                </AdminListItem>
            ))}
        </AdminTabItem>
    )
}
export default ClassTab