import { Account, Classroom } from "@/@types/model";
import React from "react";
import AdminTabItem from "../AdminTabItem";
import AdminListItem from "../AdminTabItem/ListItem";
import ClassDetail from "./ClassDetail";



const ClassTab:React.FC=()=>{
    const classrooms:Classroom[]=[
        {name:"abc",id:23},
        {name:"abcd",id:24},
        {name:"abce",id:25},
        {name:"abcf",id:26},
        {name:"abcg",id:27}]
    const listName="Classes list"

    return(
        <AdminTabItem 
            data={classrooms.map(classroom=>(
            <AdminListItem key={classroom.id} content={classroom.name}>
                <ClassDetail classroom={classroom}/>
            </AdminListItem>
             ))}
            listName={listName}
        />
    )
}
export default ClassTab