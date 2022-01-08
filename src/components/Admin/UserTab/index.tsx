import { Account } from "@/@types/model";
import React from "react";
import AdminTabItem from "../AdminTabItem";
import AdminListItem from "../AdminTabItem/ListItem";
import UserDetail from "./UserDetail";


const UserTab:React.FC=()=>{
    const users:Account[]=[
        {name:"abc",email:"hjsdkhf@dhfj.com",id:"jdhjdshfjdsh"},
        {name:"abcd",email:"hjsdkhf@dhf.com",id:"jdhjdshfjdfdsh"},
        {name:"abce",email:"hjsdkhf@dhj.com",id:"jdhjdshfjd"},
        {name:"abcf",email:"hjsdkhf@dfj.com",id:"jdhjdshfjdsdsad"},
        {name:"abcg",email:"hjsdkhf@hfj.com",id:"jdhjdshfjdsds"}]
    const listName="User list"

    return(
        <AdminTabItem 
            data={users.map(user=>(
            <AdminListItem key={user.id} content={user.name}>
                <UserDetail user={user}/>
            </AdminListItem>
             ))}
            listName={listName}
        />
    )
}
export default UserTab