import { Account } from "@/@types/model"
import { getLockRequest, unlockAccountRequest } from "@/actions/admin"
import { AppState } from "@/reducers"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

const useAdminLock=()=>{
    const locks: Account[] = useSelector((state:AppState)=>state.admin.locks.data)
    const reload = useSelector((state: AppState)=>state.admin.locks.reload)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if (reload.reload){
            dispatch(getLockRequest({
                reload: reload.fetch
            }))
        }
    },[reload])

    const apply = (desc: boolean, q:string)=>{
        dispatch(getLockRequest({
            reload: true,
            desc: desc,
            q: q
        }))
    }

    const unlockAccount = (accountId: string)=>{
        dispatch(unlockAccountRequest(accountId))
    }

    return {
        locks,
        unlockAccount,
        apply
    }
}

export default useAdminLock