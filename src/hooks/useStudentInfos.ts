import { exportTemplateRequest, getStudentInfosRequest, importStudentInfosRequest, importSubmissionRequest } from "@/actions/assignment"
import { AppState } from "@/reducers"
import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"

const useStudentInfos = ()=>{
    const studentInfos = useSelector((state: AppState)=>state.assignment.studentInfos.data)
    const classId = useSelector((state:AppState)=>state.detail.detail.id)
    const reload = useSelector((state:AppState)=>state.assignment.studentInfos.reload)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(reload){
            dispatch(getStudentInfosRequest(classId))
        }
    },[reload])

    const handleImport = (file: File)=>{
        dispatch(importStudentInfosRequest(classId, file))
    }

    const handleExport = ()=>{
        dispatch(exportTemplateRequest(classId))
    }

    const handleUploadGrade = (assignmentId:number, file:File)=>{
        dispatch(importSubmissionRequest(classId, assignmentId, file))
    }

    return {
        studentInfos,
        handleImport,
        handleExport,
        handleUploadGrade,
        classId
    }
}

export default useStudentInfos;