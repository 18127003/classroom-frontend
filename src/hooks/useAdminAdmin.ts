import { Account } from "@/@types/model"
import { activateAdminRequest, getAdminRequest } from "@/actions/admin"
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

    const activateAdmin = (email:string)=>{
        dispatch(activateAdminRequest(email))
    }

    return {
        admins,
        activateAdmin
    }
}

export default useAdminAdmin