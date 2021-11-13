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

const useClassroomWrapper = ()=>{
    const {id} = useParams<ClassroomPageParams>()
    const location = useLocation();
    const query = useQuery();
    const [invite, setInvite] = useState<boolean|null>(null)
    const dispatch = useDispatch();

    const handleAcceptInvite = () => {
        setInvite(false)
    }

    useEffect(()=>{
        setInvite(query.get("invite")==='true'?true:false)
        
    },[id])

    useEffect(()=>{
        if(invite!==null){
            if(invite===true){
                const code = query.get("code")
                dispatch(joinClassroomRequest(code))
            } else {
                if(location.state){
                    dispatch(getDetailRequest(location.state as AssignedClassroom))
                } else {
                    dispatch(getDetailRequest(+id))
                }
            }
        }
    },[invite])

    return {
        invite,
        handleAcceptInvite
    }
}

export default useClassroomWrapper;