import useAdminLock from "@/hooks/useAdminLock"
import React from "react"
import AdminTabItem from "../AdminTabItem"
import AdminListItem from "../AdminTabItem/ListItem"
import BlacklistDetail from "./BlacklistDetail"

const BlacklistTab:React.FC=()=>{
    const {locks, unlockAccount}=useAdminLock()
    const listName="Locked Account List"

    return(
        <AdminTabItem listName={listName}>
            {locks.map(lock=>(
                <AdminListItem key={lock.id} content={lock.name}>
                    <BlacklistDetail user={lock} onUnlock={unlockAccount}/>
                </AdminListItem>
            ))}
        </AdminTabItem>
    )
}
export default BlacklistTab