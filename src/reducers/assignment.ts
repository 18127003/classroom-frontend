import { AddAssignmentFail, AddAssignmentSuccess, AddSubmissionFail, AddSubmissionSuccess, AssignmentAction, AssignmentState, GetAssignmentsFail, GetAssignmentsSuccess, 
    GetStudentInfosSuccess, 
    ImportStudentInfosFail, 
    ImportSubmissionFail, 
    RemoveAssignmentFail, RemoveAssignmentSuccess, UpdateAssignmentFail, UpdateAssignmentSuccess, UpdatePositionFail, 
    UpdatePositionSuccess, 
    UpdateSubmissionFail,
    UpdateSubmissionSuccess} from "@/@types/assignment.action";
import { assignmentAction, authActions } from "@/constants/actions";

const initState:AssignmentState = {
    loading:false, 
    assignments: {
        data: [],
        reload: true
    },
    studentInfos: {
        data: [],
        reload: true
    }, 
    error:null
}

export const assignmentReducer = (state: AssignmentState = initState, action: AssignmentAction):AssignmentState=>{
    switch(action.type){
        case assignmentAction.GET_ASSIGNMENTS_REQUEST:
            return {
                ...state,
                loading: true
            };
        case assignmentAction.GET_ASSIGNMENTS_SUCCESS:
            return {
                ...state,
                loading: false,
                assignments: {
                    data: (action as GetAssignmentsSuccess).payload.assignments,
                    reload: false
                },
                error:null
            };
        case assignmentAction.GET_ASSIGNMENTS_FAIL:
            return {
                ...state,
                loading: false,
                assignments: {
                    data: [],
                    reload: true
                },
                error: (action as GetAssignmentsFail).payload.error
            };
        case assignmentAction.RELOAD_ASSIGNMENTS_REQUEST:
            return {
                ...state,
                assignments: {
                    data: [],
                    reload: true
                }
            }
        case assignmentAction.ADD_ASSIGNMENT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case assignmentAction.ADD_ASSIGNMENT_SUCCESS:
            var assignmentPayload = (action as AddAssignmentSuccess).payload
            return {
                ...state,
                loading: false,
                assignments:{
                    data: [
                        ...state.assignments.data.slice(0, assignmentPayload.index),
                        assignmentPayload.assignment,
                        ...state.assignments.data.slice(assignmentPayload.index)
                    ],
                    reload: false
                },
                error: null
            };
        case assignmentAction.ADD_ASSIGNMENT_FAIL:
            return {
                ...state,
                loading: false,
                error: (action as AddAssignmentFail).payload.error
            }
        case assignmentAction.UPDATE_POSITION_SUCCESS:
            return {
                ...state,
                assignments: {
                    data: (action as UpdatePositionSuccess).payload.assignments,
                    reload: false
                }
            }
        case assignmentAction.UPDATE_POSITION_FAIL:
            return {
                ...state,
                error: (action as UpdatePositionFail).payload.error
            }
        case assignmentAction.REMOVE_ASSIGNMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case assignmentAction.REMOVE_ASSIGNMENT_SUCCESS:
            var removeId = (action as RemoveAssignmentSuccess).payload.id
            return {
                ...state,
                loading: false,
                assignments: {
                    data: state.assignments.data.filter(assignment=>assignment.id!==removeId),
                    reload: false
                }
            }
        case assignmentAction.REMOVE_ASSIGNMENT_FAIL:
            return {
                ...state,
                loading:false,
                error: (action as RemoveAssignmentFail).payload.error
            }
        case assignmentAction.UPDATE_ASSIGNMENT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case assignmentAction.UPDATE_ASSIGNMENT_SUCCESS:
            var update = (action as UpdateAssignmentSuccess).payload.assignment
            return {
                ...state,
                loading: false,
                assignments: {
                    data: state.assignments.data.map(assignment=>assignment.id===update.id?update:assignment),
                    reload: false
                }
            }
        case assignmentAction.UPDATE_ASSIGNMENT_FAIL:
            return {
                ...state,
                loading:false,
                error: (action as UpdateAssignmentFail).payload.error
            }
        case assignmentAction.GET_STUDENT_INFO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case assignmentAction.GET_STUDENT_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                studentInfos: {
                    data: (action as GetStudentInfosSuccess).payload.studentInfos,
                    reload: false
                },
                error:null
            };
        case assignmentAction.GET_STUDENT_INFO_FAIL:
            return {
                ...state,
                loading: false,
                studentInfos: {
                    data: [],
                    reload: true
                },
                error: (action as GetAssignmentsFail).payload.error
            };
        case assignmentAction.IMPORT_STUDENT_INFO_REQUEST:
            return {
                ...state,
                loading: true
            };
        case assignmentAction.IMPORT_STUDENT_INFO_SUCCESS:
            return {
                ...state,
                loading: false,
                studentInfos: {
                    data: state.studentInfos.data,
                    reload: true
                },
                error:null
            };
        case assignmentAction.IMPORT_STUDENT_INFO_FAIL:
            return {
                ...state,
                loading: false,
                studentInfos: {
                    data: [],
                    reload: true
                },
                error: (action as ImportStudentInfosFail).payload.error
            };
        case assignmentAction.ADD_SUBMISSION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case assignmentAction.ADD_SUBMISSION_SUCCESS:
            var submissionPayload = (action as AddSubmissionSuccess).payload
            return {
                ...state,
                loading: false,
                studentInfos:{
                    data: [
                        ...state.studentInfos.data.slice(0, submissionPayload.index),
                        submissionPayload.studentInfo,
                        ...state.studentInfos.data.slice(submissionPayload.index+1)
                    ],
                    reload: false
                },
                error: null
            };
        case assignmentAction.ADD_SUBMISSION_FAIL:
            return {
                ...state,
                loading: false,
                error: (action as AddSubmissionFail).payload.error
            }
        case assignmentAction.IMPORT_SUBMISSION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case assignmentAction.IMPORT_SUBMISSION_FAIL:
            return {
                ...state,
                loading: false,
                error: (action as ImportSubmissionFail).payload.error
            };
        case assignmentAction.IMPORT_SUBMISSION_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case assignmentAction.RELOAD_STUDENT_INFO_REQUEST:
            return {
                ...state,
                loading: true,
                studentInfos:{
                    data:[],
                    reload: true
                }
            }; 
        case assignmentAction.UPDATE_SUBMISSION_REQUEST:
            return {
                ...state,
                loading: true
            };
        case assignmentAction.UPDATE_SUBMISSION_SUCCESS:
            var submissionUpdate = (action as UpdateSubmissionSuccess).payload
            return {
                ...state,
                loading: false,
                studentInfos:{
                    data: [
                        ...state.studentInfos.data.slice(0, submissionUpdate.index),
                        submissionUpdate.studentInfo,
                        ...state.studentInfos.data.slice(submissionUpdate.index+1)
                    ],
                    reload: false
                },
                error: null
            };
        case assignmentAction.UPDATE_SUBMISSION_FAIL:
            return {
                ...state,
                loading: false,
                error: (action as UpdateSubmissionFail).payload.error
            }
        case authActions.LOGOUT_SUCCESS:
            return initState;
        default:
            return state;
    }
}