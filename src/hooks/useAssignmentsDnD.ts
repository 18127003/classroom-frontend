import { getAssignmentsRequest, updatePositionRequest } from "@/actions/detail"
import { AppState } from "@/reducers"
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"

const useAssignmentDnD = ()=>{
    const assignments = useSelector((state: AppState)=>state.detail.assignments.data)
    const classId = useSelector((state:AppState)=>state.detail.detail.id)
    const reload = useSelector((state:AppState)=>state.detail.assignments.reload)
    const dispatch = useDispatch()
    const [editing,setEditing]=useState<number|null>(null)
    const [temp, setTemp]=useState<number|null>(null)

    useEffect(()=>{
        if(reload){
            dispatch(getAssignmentsRequest(classId))
        }
    },[reload])

    const onDragEnd = (result)=>{
        if (!result.destination) {
            return;
        }
        if(result.source.index===result.destination.index){
            return;
        }
        if(result.source.index!==temp){
            dispatch(updatePositionRequest(
                classId,
                result.source.index,
                result.destination.index
            ))
            if(result.source.index===editing){
                setEditing(result.destination.index)
            }
        }
    }

    const onEdit=(value: number)=>{
        setEditing(value)
    }

    const onAdd=()=>{
        onCreateTemp(editing+1)
        setEditing(editing+1)
    }

    const onPostModify=()=>{
        setTemp(null)
    }

    useEffect(()=>{
        setEditing(null)
    },[assignments])

    const onCreateTemp = (index:number)=>{
        setTemp(index)
    }

    const getLocal = ()=>{
        if(temp){
            return [
                ...assignments.slice(0, temp),
                {
                    name: "",
                    points: 0
                },
                ...assignments.slice(temp)
            ]
        } else {
            return assignments
        }
        
    }

    return {
        getLocal,
        editing,
        onDragEnd,
        onAdd,
        onEdit,
        onPostModify
    }
}

export default useAssignmentDnD;