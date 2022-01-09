import { Account } from "@/@types/model"
import { getAdminRequest } from "@/actions/admin"
import { AppState } from "@/reducers"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

const useAdminAdmin=()=>{
    const admins: Account[] = useSelector((state:AppState)=>state.admin.admins.data)
    const reload = useSelector((state: AppState)=>state.admin.admins.reload)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if (reload.reload){
            dispatch(getAdminRequest({
                reload: reload.fetch
            }))
        }
    },[reload])

    return {
        admins
    }
}

export default useAdminAdmin