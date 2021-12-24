import { gradeAction } from "@/constants/actions";
import { GradeReview, Submission } from "./model";

export interface GradeState {
    loading: boolean,
    grade: {
        data: Submission[],
        reload: boolean
    },
    review:{
        data: GradeReview[],
        reload: boolean
    }
    error: string|null,
}

export interface GetGradeSuccessPayload {
    grade: Submission[];
}

export interface GetGradeFailPayload{
    error: string
}

export interface GetGradeRequest{
    type: typeof gradeAction.GET_GRADE_REQUEST,
    payload: number //class ID
}

export interface GetGradeSuccess {
    type: typeof gradeAction.GET_GRADE_SUCCESS
    payload: GetGradeSuccessPayload
}

export interface GetGradeFail {
    type: typeof gradeAction.GET_GRADE_FAIL
    payload: GetGradeFailPayload
}

export interface ReloadGradeRequest{
    type: typeof gradeAction.RELOAD_GRADE_REQUEST
}

export interface GetGradeReviewSuccessPayload {
    reviews: GradeReview[];
}

export interface GetGradeReviewFailPayload{
    error: string
}

export interface GetGradeReviewRequest{
    type: typeof gradeAction.GET_GRADE_REVIEW_REQUEST,
    payload: number //class ID
}

export interface GetGradeReviewSuccess {
    type: typeof gradeAction.GET_GRADE_REVIEW_SUCCESS
    payload: GetGradeReviewSuccessPayload
}

export interface GetGradeReviewFail {
    type: typeof gradeAction.GET_GRADE_REVIEW_FAIL
    payload: GetGradeReviewFailPayload
}

export interface ReloadGradeReviewRequest{
    type: typeof gradeAction.RELOAD_GRADE_REVIEW_REQUEST
}

export interface AddGradeReviewSuccessPayload {
    review: GradeReview;
}

export interface AddGradeReviewFailPayload{
    error: string
}

export interface AddGradeReviewRequest{
    type: typeof gradeAction.ADD_GRADE_REVIEW_REQUEST,
    payload: {
        classId: number,
        assignmentId: number,
        gradeReview: GradeReview
    }
}

export interface AddGradeReviewSuccess {
    type: typeof gradeAction.ADD_GRADE_REVIEW_SUCCESS
    payload: AddGradeReviewSuccessPayload
}

export interface AddGradeReviewFail {
    type: typeof gradeAction.ADD_GRADE_REVIEW_FAIL
    payload: AddGradeReviewFailPayload
}

export type GradeAction = 
    | GetGradeRequest
    | GetGradeSuccess
    | GetGradeFail
    | ReloadGradeRequest
    | GetGradeReviewRequest
    | GetGradeReviewSuccess
    | GetGradeReviewFail
    | ReloadGradeReviewRequest
    | AddGradeReviewRequest
    | AddGradeReviewFail
    | AddGradeReviewSuccess