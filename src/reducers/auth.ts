import { AuthState, AuthAction, AuthSuccess, AuthFail, LogoutFail, SignupFail, SignupSuccess } from "@/@types/auth.action";
import { authActions } from "@/constants/actions";

const initState:AuthState = {loading:false, user: null, error:{}, loggedOut:false, msg: null}

export const authReducer = (state: AuthState = initState, action: AuthAction):AuthState=>{
    switch(action.type){
        case authActions.LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case authActions.SOCIAL_LOGIN_REQUEST:
            return {
                ...state,
                loading: true
            };
        case authActions.LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                loggedOut:false,
                user: (action as AuthSuccess).payload.user,
                error:{}
            };
        case authActions.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                user: null,
                error: {
                    ...state.error,
                    login: (action as AuthFail).payload.error
                }
            };
        case authActions.LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case authActions.LOGOUT_SUCCESS:
            return {
                ...initState,
                loggedOut:true
            };
        case authActions.LOGOUT_FAIL:
            return {
                ...state,
                loading:false,
                error: {
                    ...state.error,
                    login: (action as LogoutFail).payload.error
                }
            }
        case authActions.SIGNUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case authActions.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false,
                msg: (action as SignupSuccess).payload.msg
            }
        case authActions.SIGNUP_FAIL:
            return {
                ...state,
                loading: false,
                error: {
                    ...state.error,
                    signup: (action as SignupFail).payload.error
                }
            }
        default:
            return state;
    }
}