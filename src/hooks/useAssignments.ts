import { getAssignmentsRequest } from "@/actions/assignment";
import { AppState } from "@/reducers";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAssignments = ()=>{
    const assignments = useSelector((state: AppState)=>state.assignment.assignments.data)
    const classId = useSelector((state:AppState)=>state.detail.detail.id)
    const reload = useSelector((state:AppState)=>state.assignment.assignments.reload)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(reload){
            dispatch(getAssignmentsRequest(classId))
        }
    },[reload])

    return {
        assignments,
        classId
    }
}

export default useAssignments;