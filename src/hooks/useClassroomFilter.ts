import { Account, AssignedClassroom } from "@/@types/model";
import { AppState } from "@/reducers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useClassroomFilter = ()=>{
    const classrooms = useSelector((state:AppState)=>state.classrooms.classes)
    const [study, setStudents] = useState<AssignedClassroom[]>([])
    const [teach, setTeachers] = useState<AssignedClassroom[]>([])
    
    useEffect(()=>{
        const filteredStudent = classrooms.filter(p=>p.role==='STUDENT')
        setStudents(filteredStudent)
        const filteredTeacher = classrooms.filter(p=>p.role==='TEACHER')
        setTeachers(filteredTeacher)
    },[classrooms])

    return {
        study,
        teach
    }
}

export default useClassroomFilter;