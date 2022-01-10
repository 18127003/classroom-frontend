import useAdminAccount from "@/hooks/useAdminAccount";
import React from "react";
import AdminTabItem from "../AdminTabItem";
import AdminListItem from "../AdminTabItem/ListItem";
import UserDetail from "./UserDetail";


const UserTab:React.FC=()=>{
    const {accounts, apply} = useAdminAccount()
    const listName="User list"

    return(
        <AdminTabItem listName={listName} apply={apply}>
            {accounts.map(account=>(
                <AdminListItem key={account.id} content={account.name}>
                    <UserDetail user={account}/>
                </AdminListItem>
             ))}
        </AdminTabItem>
    )
}
export default UserTab