import { getGradeRequest } from "@/actions/grade";
import { AppState } from "@/reducers";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGradeManage = ()=>{
    const grades = useSelector((state: AppState)=>state.grade.grade.data)
    const classId = useSelector((state:AppState)=>state.detail.detail.id)
    const reload = useSelector((state:AppState)=>state.grade.grade.reload)
    const [totalGrade, setTotalGrade] = useState(0)
    const [totalMaxGrade, setTotalMaxGrade] = useState(0)
    const dispatch = useDispatch()

    useEffect(()=>{
        setTotalGrade(getTotalGrade())
        setTotalMaxGrade(getTotalMaxGrade())
    },[grades])

    useEffect(()=>{
        if(reload){
            dispatch(getGradeRequest(classId))
        }
    },[reload])

    const getTotalGrade = ()=>{
        return grades.map(s=>s.grade).reduce((a,b)=>a+b, 0)
    }

    const getTotalMaxGrade = ()=>{
        return grades.map(s=>s.maxGrade).reduce((a,b)=>a+b, 0)
    }

    return {
        grades,
        totalGrade,
        totalMaxGrade
    }
}

export default useGradeManage;