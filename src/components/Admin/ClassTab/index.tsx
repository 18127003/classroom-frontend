import useAdminClassroom from "@/hooks/useAdminClassroom";
import React from "react";
import AdminTabItem from "../AdminTabItem";
import AdminListItem from "../AdminTabItem/ListItem";
import ClassDetail from "./ClassDetail";

const ClassTab:React.FC=()=>{
    const {classrooms, apply}=useAdminClassroom()
    const listName="Classes list"

    return(
        <AdminTabItem listName={listName} apply={apply}>
            {classrooms.map(classroom=>(
                <AdminListItem key={classroom.id} content={classroom.name}>
                    <ClassDetail classroom={classroom}/>
                </AdminListItem>
            ))}
        </AdminTabItem>
    )
}
export default ClassTab