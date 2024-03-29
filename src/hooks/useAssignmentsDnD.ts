import { updatePositionRequest } from "@/actions/assignment"
import { useState } from "react"
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
        let source = result.source.index
        let dest = result.destination.index
        if(source===dest){
            return;
        }
        if(temp!==null){
            if((temp>source&&temp<=dest)||(temp<source&&temp>=dest)){
                let mod:number = temp + (source<temp?-1:1)
                setTemp(mod)
                setEditing(mod)
                if(source-dest===-1||source-dest===1){
                    return;
                }
            }
            else if(source===temp){
                setTemp(dest)
                setEditing(dest)
                return;
            }
            if(source > temp){
                source--;
            }
            if(dest >= temp && dest>0){
                dest--;
            }
        } else if(source===editing){
            setEditing(dest)
        } else {
            setEditing(null)
        }
        dispatch(updatePositionRequest(
            classId,
            source,
            dest
        ))
    }

    const onEdit=(value: number)=>{
        if(temp==null){
            setEditing(value)
        } else {
           
            if(temp >= value){
                setEditing(value)
            } else {
                setEditing(value-1)
            }
            setTemp(null)
        }
    }

    const onPostModify=()=>{
        setTemp(null)
        setEditing(null)
    }

    const onCreateTemp = (index:number)=>{
        setTemp(index)
        setEditing(index)
    }

    const getLocal = ()=>{
        if(temp!==null){
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
        onCreateTemp,
        onEdit,
        onPostModify
    }
}

export default useAssignmentDnD;