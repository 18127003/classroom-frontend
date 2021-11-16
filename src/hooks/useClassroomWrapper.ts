import { AssignedClassroom } from "@/@types/model";
import { joinClassroomRequest } from "@/actions/classrooms";
import { redirectSuccess } from "@/actions/common";
import { getDetailRequest } from "@/actions/detail";
import { useQuery } from "@/hooks/useQuery";
import { AppState } from "@/reducers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
    const redirect = useSelector((state: AppState)=>state.detail.redirect)
    const [load, setLoad]=useState(false)

    const handleAcceptInvite = () => {
        setInvite(false)
    }

    useEffect(()=>{
        setInvite(query.get("invite")==='true'?true:false)
        if(!invite){
            setLoad(true)
        }
        
    },[id])

    useEffect(()=>{
        if(load){
            if(location.state){
                dispatch(getDetailRequest(location.state as AssignedClassroom))
            } else {
                dispatch(getDetailRequest(+id))
            }
        }
        setLoad(false)
    },[load])

    useEffect(()=>{
        if(invite!==null){
            if(invite===true){
                const code = query.get("code")
                dispatch(joinClassroomRequest({
                    code: code
                }))
            } else {
                setLoad(true)
            }
        }
    },[invite])

    useEffect(()=>{
        if(redirect){
            dispatch(redirectSuccess())
        }
    },[])

    return {
        invite,
        handleAcceptInvite
    }
}

export default useClassroomWrapper;