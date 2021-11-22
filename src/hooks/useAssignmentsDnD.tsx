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
    const [editing,setEditing]=useState<number|null>(null)
    const [migrateEditing,setMigrateEditing]=useState<number|null>(null)

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
            setEditing(null)
        }
    }

    const onEdit=(value: number)=>{
        setEditing(value)
    }

    const onAdd=()=>{
        onCreateTemp(editing+1)
        setEditing(editing+1)
    }

    const onPostAdd=()=>{
        setEditing(null)
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
        editing,
        onDragEnd,
        onAdd,
        onEdit,
        onPostAdd
    }
}

export default useAssignmentDnD;