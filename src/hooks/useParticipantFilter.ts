import { Account } from "@/@types/model";
import { AppState } from "@/reducers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useParticipantFilter = ()=>{
    const participants = useSelector((state:AppState)=>state.detail.participants.data)
    const accountEmail = useSelector((state: AppState)=>state.account.detail.email)
    const [students, setStudents] = useState<Account[]>([])
    const [teachers, setTeachers] = useState<Account[]>([])
    
    useEffect(()=>{
        const filteredStudent = participants.filter(p=>p.role==='STUDENT'&&p.email!==accountEmail)
        setStudents(filteredStudent)
        const filteredTeacher = participants.filter(p=>p.role==='TEACHER')
        setTeachers(filteredTeacher)
    },[participants])

    return {
        students,
        teachers
    }
}

export default useParticipantFilter;