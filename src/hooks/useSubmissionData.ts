import { Assignment, StudentInfo, Submission } from "@/@types/model";
import { AppState } from "@/reducers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const useSubmissionData=(studentInfo: StudentInfo, assignments: Assignment[])=>{

    const classId = useSelector((state:AppState)=>state.detail.detail.id)
    const [submissions, setSubmissions]=useState<Submission[]>([])
    const [totalGrade, setTotalGrade] = useState(0)

    useEffect(()=>{
        setSubmissions(generateStudentSubmission())
        setTotalGrade(getTotalGrade())
    },[studentInfo.submissions])

    const generateStudentSubmission = ():Submission[]=>{
        return assignments.map(assignment=>{
            var sub = studentInfo.submissions.find(s=>s.assignmentId===assignment.id)
            if(sub) return sub
            return {
                maxGrade: assignment.points,
                assignmentId: assignment.id,
                classroomId: classId,
                studentId: studentInfo.studentId
            }
        })
    }

    const getTotalGrade = ():number=>{
        return studentInfo.submissions.map(s=>s.grade).reduce((a,b)=>a+b, 0)
    }

    return {
        submissions,
        totalGrade
    }
}

export default useSubmissionData;