import { Account } from "@/@types/model"
import { getAccountRequest, getLockRequest, unlockAccountRequest } from "@/actions/admin"
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

    const unlockAccount = (accountId: string)=>{
        dispatch(unlockAccountRequest(accountId))
    }

    return {
        locks,
        unlockAccount,
    }
}

export default useAdminLock