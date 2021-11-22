import { Assignment } from "@/@types/model"
import { getAssignmentsRequest, updatePositionRequest } from "@/actions/detail"
import { AppState } from "@/reducers"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

const useAssignmentDnD = ()=>{
    const assignments = useSelector((state: AppState)=>state.detail.assignments.data)
    const classId = useSelector((state:AppState)=>state.detail.detail.id)
    const reload = useSelector((state:AppState)=>state.detail.assignments.reload)
    const dispatch = useDispatch()
    const [local, setLocal] = useState<Assignment[]>([])

    useEffect(()=>{
        if(reload){
            dispatch(getAssignmentsRequest(classId))
        }
    },[reload])

    useEffect(()=>{
        setLocal(assignments)
    },[assignments])

    const onDragEnd = (result)=>{
        if (!result.destination) {
            return;
        }
        if(result.source.index!==-1){
            dispatch(updatePositionRequest(
                classId,
                result.source.index,
                result.destination.index
            ))
        }
        
    }

    const onCreateTemp = (index:number)=>{
        setLocal([
            ...local.slice(0, index),
            {
                name: "",
                points: 0
            },
            ...local.slice(index)
        ])
    }

    return {
        local,
        onDragEnd,
        onCreateTemp
    }
}

export default useAssignmentDnD;