import { Classroom } from "@/@types/model"
import { getClassroomRequest } from "@/actions/admin"
import { AppState } from "@/reducers"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useAdminClassroom=()=>{
    const classrooms: Classroom[] = useSelector((state:AppState)=>state.admin.classrooms.data)
    const reload = useSelector((state: AppState)=>state.admin.classrooms.reload)
    const dispatch = useDispatch()
    
    useEffect(()=>{
        if (reload.reload){
            dispatch(getClassroomRequest({
                reload: reload.fetch
            }))
        }
    },[reload])

    return {
        classrooms
    }
}

export default useAdminClassroom