import { GetOverallGradeFail, GetOverallGradeSuccess, GradeAction, GradeState } from "@/@types/grade.action";
import { authActions, gradeAction } from "@/constants/actions";

const initState: GradeState = {
    loading:false, 
    overall: {
        data: {
            overallGrade:0,
            maxGrade:0
        },
        reload: true
    },
    error:null
}

export const gradeReducer = (state: GradeState = initState, action: GradeAction):GradeState=>{
    switch(action.type){
        case gradeAction.GET_OVERALL_GRADE_REQUEST:
            return {
                ...state,
                loading: true
            };
        case gradeAction.GET_OVERALL_GRADE_SUCCESS:
            return {
                ...state,
                loading: false,
                overall: {
                    data: (action as GetOverallGradeSuccess).payload.overall,
                    reload: false
                },
                error:null
            };
        case gradeAction.GET_OVERALL_GRADE_FAIL:
            return {
                ...state,
                loading: false,
                overall: {
                    data: {
                        overallGrade:0,
                        maxGrade:0
                    },
                    reload: true
                },
                error: (action as GetOverallGradeFail).payload.error
            };
        case gradeAction.RELOAD_OVERALL_GRADE_REQUEST:
            return {
                ...state,
                overall: {
                    data: {
                        ...state.overall.data
                    },
                    reload: true
                }
            }
        case authActions.LOGOUT_SUCCESS:
            return initState;
        default:
            return state;
    }
}