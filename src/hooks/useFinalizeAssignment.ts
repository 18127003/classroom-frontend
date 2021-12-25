import { finalizeAssignmentRequest } from "@/actions/assignment"
import { AppState } from "@/reducers"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"

const useFinalizeAssignment = (assignmentId: number)=>{
    const classId = useSelector((state: AppState)=>state.detail.detail.id)
    const warning = useSelector((state: AppState)=>state.assignment.assignments.warning)
    const [warn, setWarn] = useState<string|null>(null)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(warning && warning.assignmentId===assignmentId){
            setWarn(warning.msg)
        }
    },[warning])

    const finalizeAssignment = ()=>{
        dispatch(finalizeAssignmentRequest(classId, assignmentId, true))
    }

    const finalizeWarningAssignment = ()=>{
        dispatch(finalizeAssignmentRequest(classId, assignmentId, false))
    }

    const acceptWarning = ()=>{setWarn(null)}

    return {
        finalizeAssignment,
        finalizeWarningAssignment,
        acceptWarning,
        warn
    }
}

export default useFinalizeAssignment