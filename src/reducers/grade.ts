import { AddGradeReviewFail, AddGradeReviewSuccess, GetGradeFail, GetGradeReviewFail, GetGradeReviewSuccess, GetGradeSuccess, 
    GradeAction, GradeState } from "@/@types/grade.action";
import { authActions, detailAction, gradeAction } from "@/constants/actions";

const initState: GradeState = {
    loading:false, 
    grade: {
        data: [],
        reload: true
    },
    review:{
        data:[],
        reload: true
    },
    error:null
}

export const gradeReducer = (state: GradeState = initState, action: GradeAction):GradeState=>{
    switch(action.type){
        case gradeAction.GET_GRADE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case gradeAction.GET_GRADE_SUCCESS:
            return {
                ...state,
                loading: false,
                grade: {
                    data: (action as GetGradeSuccess).payload.grade,
                    reload: false
                },
                error:null
            };
        case gradeAction.GET_GRADE_FAIL:
            return {
                ...state,
                loading: false,
                grade: {
                    data: [],
                    reload: true
                },
                error: (action as GetGradeFail).payload.error
            };
        case gradeAction.RELOAD_GRADE_REQUEST:
            return {
                ...state,
                grade: {
                    data: {
                        ...state.grade.data
                    },
                    reload: true
                }
            }
        case gradeAction.GET_GRADE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            };
        case gradeAction.GET_GRADE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                review: {
                    data: (action as GetGradeReviewSuccess).payload.reviews,
                    reload: false
                },
                error:null
            };
        case gradeAction.GET_GRADE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                review: {
                    data: [],
                    reload: true
                },
                error: (action as GetGradeReviewFail).payload.error
            };
        case gradeAction.RELOAD_GRADE_REVIEW_REQUEST:
            return {
                ...state,
                review: {
                    data: {
                        ...state.review.data
                    },
                    reload: true
                }
            }
        case gradeAction.ADD_GRADE_REVIEW_REQUEST:
            return {
                ...state,
                loading: true
            };
        case gradeAction.ADD_GRADE_REVIEW_SUCCESS:
            return {
                ...state,
                loading: false,
                review: {
                    ...state.review,
                    data: [
                        ...state.review.data,
                        (action as AddGradeReviewSuccess).payload.review
                    ]
                },
                error:null
            };
        case gradeAction.ADD_GRADE_REVIEW_FAIL:
            return {
                ...state,
                loading: false,
                error: (action as AddGradeReviewFail).payload.error
            };
        case detailAction.RESTART_DETAIL_REQUEST:
            return initState;
        case authActions.LOGOUT_SUCCESS:
            return initState;
        default:
            return state;
    }
}