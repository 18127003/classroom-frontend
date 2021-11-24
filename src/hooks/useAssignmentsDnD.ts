import { updatePositionRequest } from "@/actions/detail"
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
            if(dest >= temp){
                dest--;
            }
        } else  if(source===editing){
            setEditing(dest)
        }
        dispatch(updatePositionRequest(
            classId,
            source,
            dest
        ))
    }

    const onEdit= (value: number)=>{
        if(temp==null){
            setEditing(value)
        } else {
            setTemp(null)
            if(temp >= value){
                setEditing(value)
            } else {
                setEditing(value-1)
            }
        }
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
        if(temp!==null){
            console.log(temp)
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