import { GradeReview } from "@/@types/model"
import { addGradeReviewRequest, getGradeReviewRequest } from "@/actions/grade"
import { AppState } from "@/reducers"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

const useGradeReview = ()=>{
    const reviews = useSelector((state: AppState)=>state.grade.review.data)
    const classId = useSelector((state:AppState)=>state.detail.detail.id)
    const reload = useSelector((state:AppState)=>state.grade.review.reload)
    const dispatch = useDispatch()

    useEffect(()=>{
        if(reload){
            dispatch(getGradeReviewRequest(classId))
        }
    },[reload])

    const addGradeReview = (assignmentId: number, gradeReview: GradeReview)=>{
        dispatch(addGradeReviewRequest(classId, assignmentId, gradeReview))
    }

    return {
        reviews,
        addGradeReview
    }
}

export default useGradeReview;