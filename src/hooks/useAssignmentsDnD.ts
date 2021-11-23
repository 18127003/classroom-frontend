import { updatePositionRequest } from "@/actions/detail"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import useAssignments from "./useAssignments"

const useAssignmentDnD = ()=>{
    const {assignments, classId} = useAssignments()
    const dispatch = useDispatch()
    const [editing,setEditing]=useState<number|null>(null)
    const [temp, setTemp]=useState<number|null>(null)

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

    useEffect(()=>{
        if(editing!==temp){
            setTemp(null)
        }
    },[editing])

    const onEdit=(value: number)=>{
        setEditing(value)
    }

    const onAdd=()=>{
        onCreateTemp(editing+1)
        setEditing(editing+1)
    }

    const onPostModify=()=>{
        setTemp(null)
        setEditing(null)
    }

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