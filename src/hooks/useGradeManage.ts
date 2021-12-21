import { getOverallGradeRequest } from "@/actions/grade";
import { AppState } from "@/reducers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGradeManage = ()=>{
    const overall = useSelector((state: AppState)=>state.grade.overall.data)
    const classId = useSelector((state:AppState)=>state.detail.detail.id)
    const reload = useSelector((state:AppState)=>state.grade.overall.reload)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(reload){
            dispatch(getOverallGradeRequest(classId))
        }
    },[reload])

    return {
        overall
    }
}

export default useGradeManage;