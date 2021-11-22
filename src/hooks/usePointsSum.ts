import { AppState } from "@/reducers";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const usePointsSum = ()=>{
    const assignments = useSelector((state:AppState)=>state.detail.assignments.data)
    const [total, setTotal] = useState(0)

    useEffect(()=>{
        const sum = assignments.map(assignment=>assignment.points??0).reduce((a,b)=>a+b, 0)
        setTotal(sum)
    },[assignments])

    return total;
}

export default usePointsSum;