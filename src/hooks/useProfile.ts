import { Account } from "@/@types/model";
import { changePasswordRequest, updateRequest, updateStudentIdRequest } from "@/actions/account";
import { AppState } from "@/reducers";
import { useDispatch, useSelector } from "react-redux"

const useProfile = ()=>{
    const user = useSelector((state:AppState)=>state.account.detail);
    const dispatch = useDispatch()

    const updateStudentId = (studentId: string, name: string)=>{
        dispatch(updateStudentIdRequest({
            studentId,
            name
        }))
    }

    const editProfile = (account: Account)=>{
        dispatch(updateRequest(account))
    }

    const changePassword = (oldPassword: string, newPassword:string)=>{
        dispatch(changePasswordRequest({
            oldPassword,
            newPassword
        }))
    }

    return {
        user,
        updateStudentId,
        editProfile,
        changePassword
    }
}

export default useProfile