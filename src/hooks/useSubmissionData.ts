import { Assignment, StudentInfo, Submission } from "@/@types/model";
import { AppState } from "@/reducers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useSubmissionData=(studentInfo: StudentInfo, assignments: Assignment[])=>{

    const classId = useSelector((state:AppState)=>state.detail.detail.id)
    const [submissions, setSubmissions]=useState<Submission[]>([])

    useEffect(()=>{
        setSubmissions(generateStudentSubmission())
    },[assignments])

    const generateStudentSubmission = ():Submission[]=>{
        return assignments.map(assignment=>{
            var sub = studentInfo.submissions.find(s=>s.assignmentId===assignment.id)
            if(sub) return sub
            return {
                grade: 0,
                maxGrade: assignment.points,
                assignmentId: assignment.id,
                classroomId: classId,
                studentId: studentInfo.studentId
            }
        })
    }

    const totalGrade = ():number=>{
        return studentInfo.submissions.map(s=>s.grade).reduce((a,b)=>a+b)
    }

    return {
        submissions,
        totalGrade
    }
}

export default useSubmissionData;