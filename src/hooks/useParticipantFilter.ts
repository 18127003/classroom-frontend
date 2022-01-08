import { Participant } from "@/@types/model";
import { AppState } from "@/reducers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useParticipantFilter = ()=>{
    const participants = useSelector((state:AppState)=>state.detail.participants.data)
    const classroom = useSelector((state: AppState)=>state.detail.detail)
    const accountId = useSelector((state:AppState)=>state.account.detail.id)
    const [students, setStudents] = useState<Participant[]>([])
    const [teachers, setTeachers] = useState<Participant[]>([])
    
    useEffect(()=>{
        let filteredStudents: Participant[];
        if(classroom.role==="TEACHER"){
            filteredStudents = participants.filter(p=>p.role==='STUDENT')
        } else {
            filteredStudents = participants.filter(p=>p.role==="STUDENT"&&p.accountId!==accountId&&!p.hidden)
        }         
        setStudents(filteredStudents)
        const filteredTeacher = participants.filter(p=>p.role==='TEACHER')
        setTeachers(filteredTeacher)
    },[participants])

    return {
        students,
        teachers
    }
}

export default useParticipantFilter;