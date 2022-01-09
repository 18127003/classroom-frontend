import { Account } from "@/@types/model"
import { getAccountRequest } from "@/actions/admin"
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

    return {
        accounts
    }
}

export default useAdminAccount