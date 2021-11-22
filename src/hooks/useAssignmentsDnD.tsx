import { getAssignmentsRequest, updatePositionRequest } from "@/actions/detail"
import { AppState } from "@/reducers"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

const useAssignmentDnD = ()=>{
    const assignments = useSelector((state: AppState)=>state.detail.assignments.data)
    const classId = useSelector((state:AppState)=>state.detail.detail.id)
    const reload = useSelector((state:AppState)=>state.detail.assignments.reload)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(reload){
            dispatch(getAssignmentsRequest(classId))
        }
    },[reload])

    const onDragEnd = (result)=>{
        if (!result.destination) {
            return;
        }
        dispatch(updatePositionRequest(
            classId,
            assignments,
            result.source.index,
            result.destination.index
        ))
    }

    return {
        assignments,
        onDragEnd
    }
}

export default useAssignmentDnD;