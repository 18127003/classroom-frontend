import { gradeAction } from "@/constants/actions";
import { OverallGrade } from "./model";

export interface GradeState {
    loading: boolean,
    overall: {
        data: OverallGrade,
        reload: boolean
    },
    error: string|null,
}

export interface GetOverallGradeSuccessPayload {
    overall: OverallGrade;
}

export interface GetOverallGradeFailPayload{
    error: string
}

export interface GetOverallGradeRequest{
    type: typeof gradeAction.GET_OVERALL_GRADE_REQUEST,
    payload: number //class ID
}

export interface GetOverallGradeSuccess {
    type: typeof gradeAction.GET_OVERALL_GRADE_SUCCESS
    payload: GetOverallGradeSuccessPayload
}

export interface GetOverallGradeFail {
    type: typeof gradeAction.GET_OVERALL_GRADE_FAIL
    payload: GetOverallGradeFailPayload
}

export interface ReloadOverallGradeRequest{
    type: typeof gradeAction.RELOAD_OVERALL_GRADE_REQUEST
}

export type GradeAction = 
    | GetOverallGradeRequest
    | GetOverallGradeSuccess
    | GetOverallGradeFail
    | ReloadOverallGradeRequest