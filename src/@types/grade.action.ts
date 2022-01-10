import { gradeAction } from "@/constants/actions";
import { GradeReview, GradeReviewComment, Submission } from "./model";

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
    msg: string|null
}

export interface MsgPayload{
    msg: string
}

export interface GetGradeSuccessPayload {
    grade: Submission[];
}

export interface GradeFailPayload{
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
    payload: GradeFailPayload
}

export interface ReloadGradeRequest{
    type: typeof gradeAction.RELOAD_GRADE_REQUEST
}

export interface GetGradeReviewSuccessPayload {
    reviews: GradeReview[];
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
    payload: GradeFailPayload
}

export interface ReloadGradeReviewRequest{
    type: typeof gradeAction.RELOAD_GRADE_REVIEW_REQUEST
}

export interface AddGradeReviewSuccessPayload extends MsgPayload{
    review: GradeReview;
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
    payload: GradeFailPayload
}

export interface CommentGradeReviewSuccessPayload {
    review: GradeReview;
    index: number;
}

export interface CommentGradeReviewRequest{
    type: typeof gradeAction.COMMENT_GRADE_REVIEW_REQUEST,
    payload: {
        classId: number,
        assignmentId: number,
        reviewId: number,
        comment: GradeReviewComment
    }
}

export interface CommentGradeReviewSuccess {
    type: typeof gradeAction.COMMENT_GRADE_REVIEW_SUCCESS
    payload: CommentGradeReviewSuccessPayload
}

export interface CommentGradeReviewFail {
    type: typeof gradeAction.COMMENT_GRADE_REVIEW_FAIL
    payload: GradeFailPayload
}

export interface FinalizeGradeReviewSuccessPayload extends MsgPayload{
    reviews: GradeReview[]
}

export interface FinalizeGradeReviewRequest{
    type: typeof gradeAction.FINALIZE_GRADE_REVIEW_REQUEST,
    payload: {
        classId: number,
        assignmentId: number,
        reviewId: number,
        grade: number
    }
}

export interface FinalizeGradeReviewSuccess {
    type: typeof gradeAction.FINALIZE_GRADE_REVIEW_SUCCESS,
    payload: FinalizeGradeReviewSuccessPayload
}

export interface FinalizeGradeReviewFail {
    type: typeof gradeAction.FINALIZE_GRADE_REVIEW_FAIL
    payload: GradeFailPayload
}

export type CommentAction = 
    | CommentGradeReviewRequest
    | CommentGradeReviewSuccess
    | CommentGradeReviewFail

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
    | CommentAction
    | FinalizeGradeReviewRequest
    | FinalizeGradeReviewSuccess
    | FinalizeGradeReviewFail