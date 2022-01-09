import { ActivateAdminFail, ActivateAdminSuccess, AdminAction, AdminState, CreateAdminFail, CreateAdminSuccess, GetAccountFail, GetAccountSuccess, GetAdminFail, GetAdminSuccess, GetClassroomFail, GetClassroomSuccess, GetLockFail, GetLockSuccess, LockAccountFail, LockAccountSuccess, MapStudentIdFail, MapStudentIdSuccess, ReloadAccountRequest, RemoveStudentIdFail, RemoveStudentIdSuccess, UnlockAccountFail, UnlockAccountSuccess } from "@/@types/admin.action";
import { adminAction, authActions } from "@/constants/actions";

const initState:AdminState = {
    loading:false, 
    admins:{
        data:[],
        reload: {
            reload: true,
            fetch: true
        }
    }, 
    classrooms:{
        data:[],
        reload: {
            reload: true,
            fetch: true
        }
    },
    accounts: {
        data:[],
        reload: {
            reload: true,
            fetch: true
        }
    },
    locks: {
        data:[],
        reload: {
            reload: true,
            fetch: true
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
        case adminAction.GET_LOCK_REQUEST:
            return {
                ...state,
                loading: true,
                locks:{
                    ...state.locks,
                    reload: {
                        reload: false,
                        fetch: false
                    },
                }
            }
        case adminAction.GET_LOCK_SUCCESS:
            return {
                ...state,
                loading: false,
                locks: {
                    ...state.locks,
                    data: (action as GetLockSuccess).payload.locks
                },
                error:null
            };
        case adminAction.GET_LOCK_FAIL:
            return {
                ...state,
                loading: false,
                locks: {
                    ...state.locks,
                    data:[]
                },
                error:(action as GetLockFail).payload.error
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
        case adminAction.RELOAD_ACCOUNT_REQUEST:
            return {
                ...state,
                accounts:{
                    ...state.accounts,
                    reload:{
                        reload: true,
                        fetch: (action as ReloadAccountRequest).payload.fetch
                    }
                }
            }
        case adminAction.RELOAD_LOCK_REQUEST:
            return {
                ...state,
                locks:{
                    ...state.locks,
                    reload:{
                        reload: true,
                        fetch: (action as ReloadAccountRequest).payload.fetch
                    }
                }
            }
        case adminAction.ACTIVATE_ADMIN_REQUEST:
            return {
                ...state,
                loading: true
            }
        case adminAction.ACTIVATE_ADMIN_SUCCESS:
            return {
                ...state,
                loading: false,
                admins:{
                    ...state.admins,
                    data: (action as ActivateAdminSuccess).payload.admins
                },
                error: null,
                msg: (action as ActivateAdminSuccess).payload.msg
            }
        case adminAction.ACTIVATE_ADMIN_FAIL:
            return {
                ...state,
                loading: false,
                error: (action as ActivateAdminFail).payload.error
            }
        case adminAction.LOCK_ACCOUNT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case adminAction.LOCK_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                accounts:{
                    ...state.accounts,
                    data: (action as LockAccountSuccess).payload.accounts
                },
                error: null,
                msg: (action as LockAccountSuccess).payload.msg
            }
        case adminAction.LOCK_ACCOUNT_FAIL:
            return {
                ...state,
                loading: false,
                error: (action as LockAccountFail).payload.error
            }
        case adminAction.UNLOCK_ACCOUNT_REQUEST:
            return {
                ...state,
                loading: true
            }
        case adminAction.UNLOCK_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                locks:{
                    ...state.locks,
                    data: (action as UnlockAccountSuccess).payload.accounts
                },
                error: null,
                msg: (action as UnlockAccountSuccess).payload.msg
            }
        case adminAction.UNLOCK_ACCOUNT_FAIL:
            return {
                ...state,
                loading: false,
                error: (action as UnlockAccountFail).payload.error
            }
        case adminAction.MAP_STUDENT_ID_REQUEST:
            return {
                ...state,
                loading: true
            }
        case adminAction.MAP_STUDENT_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                accounts:{
                    ...state.accounts,
                    data: (action as MapStudentIdSuccess).payload.accounts
                },
                error: null,
                msg: (action as MapStudentIdSuccess).payload.msg
            }
        case adminAction.MAP_STUDENT_ID_FAIL:
            return {
                ...state,
                loading: false,
                error: (action as MapStudentIdFail).payload.error
            }
        case adminAction.REMOVE_STUDENT_ID_REQUEST:
            return {
                ...state,
                loading: true
            }
        case adminAction.REMOVE_STUDENT_ID_SUCCESS:
            return {
                ...state,
                loading: false,
                accounts:{
                    ...state.accounts,
                    data: (action as RemoveStudentIdSuccess).payload.accounts
                },
                error: null,
                msg: (action as RemoveStudentIdSuccess).payload.msg
            }
        case adminAction.REMOVE_STUDENT_ID_FAIL:
            return {
                ...state,
                loading: false,
                error: (action as RemoveStudentIdFail).payload.error
            }
        case authActions.LOGOUT_SUCCESS:
            return initState;
        default:
            return state;
    }
}