import { AdminAction, AdminState, CreateAdminFail, CreateAdminSuccess, GetAccountFail, GetAccountSuccess, GetAdminFail, GetAdminSuccess, GetClassroomFail, GetClassroomSuccess } from "@/@types/admin.action";
import { adminAction, authActions } from "@/constants/actions";

const initState:AdminState = {
    loading:false, 
    admins:{
        data:[],
        reload: {
            reload: true,
            fetch: false
        }
    }, 
    classrooms:{
        data:[],
        reload: {
            reload: true,
            fetch: false
        }
    },
    accounts: {
        data:[],
        reload: {
            reload: true,
            fetch: false
        }
    },
    msg: null,
    error:null
}

export const adminReducer = (state: AdminState = initState, action: AdminAction):AdminState=>{
    switch(action.type){
        case adminAction.CREATE_ADMIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case adminAction.CREATE_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                msg: (action as CreateAdminSuccess).payload.msg
            };
        case adminAction.CREATE_ADMIN_FAIL:
            return {
                ...state,
                loading: false,
                error:(action as CreateAdminFail).payload.error
            };
        case adminAction.GET_CLASSROOM_REQUEST:
            return {
                ...state,
                loading: true,
                classrooms:{
                    ...state.classrooms,
                    reload: {
                        reload: false,
                        fetch: false
                    },
                }
            }
        case adminAction.GET_CLASSROOM_SUCCESS:
            return {
                ...state,
                loading: false,
                classrooms: {
                    ...state.classrooms,
                    data: (action as GetClassroomSuccess).payload.classrooms
                },
                error:null
            };
        case adminAction.GET_CLASSROOM_FAIL:
            return {
                ...state,
                loading: false,
                classrooms: {
                    ...state.classrooms,
                    data:[]
                },
                error:(action as GetClassroomFail).payload.error
            };
        case adminAction.GET_ACCOUNT_REQUEST:
            return {
                ...state,
                loading: true,
                accounts:{
                    ...state.accounts,
                    reload: {
                        reload: false,
                        fetch: false
                    },
                }
            }
        case adminAction.GET_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                accounts: {
                    ...state.accounts,
                    data: (action as GetAccountSuccess).payload.accounts
                },
                error:null
            };
        case adminAction.GET_ACCOUNT_FAIL:
            return {
                ...state,
                loading: false,
                accounts: {
                    ...state.accounts,
                    data:[]
                },
                error:(action as GetAccountFail).payload.error
            };
        case adminAction.GET_ADMIN_REQUEST:
            return {
                ...state,
                loading: true,
                admins:{
                    ...state.admins,
                    reload: {
                        reload: false,
                        fetch: false
                    },
                }
            }
        case adminAction.GET_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                admins: {
                    ...state.admins,
                    data: (action as GetAdminSuccess).payload.admins
                },
                error:null
            };
        case adminAction.GET_ADMIN_FAIL:
            return {
                ...state,
                loading: false,
                admins: {
                    ...state.admins,
                    data:[]
                },
                error:(action as GetAdminFail).payload.error
            };
        case authActions.LOGOUT_SUCCESS:
            return initState;
        default:
            return state;
    }
}