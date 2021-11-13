import { AssignedClassroom } from "@/@types/model";
import { joinClassroomRequest } from "@/actions/classrooms";
import { getDetailRequest } from "@/actions/detail";
import { useQuery } from "@/hooks/useQuery";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useParams } from "react-router-dom";

type ClassroomPageParams = {
    id: string
}

const useClassroomWrapper = (acceptInvitation: boolean)=>{
    const {id} = useParams<ClassroomPageParams>()
    const location = useLocation();
    const query = useQuery();
    const [invite, setInvite] = useState(false)
    const dispatch = useDispatch();

    useEffect(()=>{
        setInvite(query.get("invite")==='true'?true:false)
        if(!invite){
            if(location.state){
                dispatch(getDetailRequest(location.state as AssignedClassroom))
            } else {
                dispatch(getDetailRequest(+id))
            }
        }
    },[id])

    useEffect(()=>{
        if(invite){
            const code = query.get("code")
            dispatch(joinClassroomRequest(code))
        }
    },[acceptInvitation])

    return {
        invite
    }
}

export default useClassroomWrapper;