import useAdminAdmin from "@/hooks/useAdminAdmin";
import React from "react";
import AdminTabItem from "../AdminTabItem";
import AdminListItem from "../AdminTabItem/ListItem";
import AdminDetail from "./AdminDetail";


const AdminTab:React.FC=()=>{
    const {admins, apply}=useAdminAdmin()
    const listName="Admin list"

    return(
        <AdminTabItem listName={listName} apply={apply}>
            {admins.map(admin=>(
                <AdminListItem key={admin.id} content={admin.name}>
                    <AdminDetail user={admin}/>
                </AdminListItem>
            ))}
        </AdminTabItem>
    )
}
export default AdminTab