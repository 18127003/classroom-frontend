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

    const apply = (desc: boolean, q:string)=>{
        dispatch(getAdminRequest({
            reload: true,
            desc: desc,
            q: q
        }))
    }

    const activateAdmin = (email:string)=>{
        dispatch(activateAdminRequest(email))
    }

    return {
        admins,
        apply,
        activateAdmin
    }
}

export default useAdminAdmin