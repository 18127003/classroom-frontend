import { Account, StudentInfo } from "@/@types/model"
import { getAccountRequest, lockAccountRequest, mapStudentIdRequest, removeStudentIdRequest, unlockAccountRequest } from "@/actions/admin"
import { AppState } from "@/reducers"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

const useAdminAccount=()=>{
    const accounts: Account[] = useSelector((state:AppState)=>state.admin.accounts.data)
    const reload = useSelector((state: AppState)=>state.admin.accounts.reload)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if (reload.reload){
            dispatch(getAccountRequest({
                reload: reload.fetch
            }))
        }
    },[reload])

    const lockAccount = (accountId: string)=>{
        dispatch(lockAccountRequest(accountId))
    }

    const unlockAccount = (accountId: string)=>{
        dispatch(unlockAccountRequest(accountId))
    }

    const mapStudentId = (accountId: string, studentInfo: StudentInfo)=>{
        dispatch(mapStudentIdRequest(accountId, studentInfo))
    }

    const removeStudentId = (accountId: string)=>{
        dispatch(removeStudentIdRequest(accountId))
    }

    return {
        accounts,
        lockAccount,
        unlockAccount,
        mapStudentId,
        removeStudentId
    }
}

export default useAdminAccount