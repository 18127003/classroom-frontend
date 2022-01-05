import { GradeReview } from "@/@types/model"
import { addGradeReviewRequest, commentGradeReviewRequest, finalizeGradeReviewRequest, getGradeReviewRequest } from "@/actions/grade"
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

    const comment = (gradeReview: GradeReview, comment: Comment)=>{
        dispatch(commentGradeReviewRequest(classId, gradeReview.assignmentId, gradeReview.id, comment))
    }

    const finalize = (gradeReview: GradeReview, grade: number)=>{
        dispatch(finalizeGradeReviewRequest(classId, gradeReview.assignmentId, gradeReview.id, grade))
    }

    return {
        reviews,
        addGradeReview,
        comment,
        finalize
    }
}

export default useGradeReview;