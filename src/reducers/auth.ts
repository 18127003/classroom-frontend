import { AuthState, AuthAction, AuthSuccess, AuthFail, LogoutFail } from "@/@types/auth.action";
import { authActions } from "@/constants/actions";

const initState:AuthState = {loading:false, user: null, error:null}

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
                user: (action as AuthSuccess).payload.user,
                error:null
            };
        case authActions.LOGIN_FAIL:
            return {
                ...state,
                loading: false,
                user: null,
                error: (action as AuthFail).payload.error
            };
        case authActions.LOGOUT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case authActions.LOGOUT_SUCCESS:
            return initState;
        case authActions.LOGOUT_FAIL:
            return {
                ...state,
                loading:false,
                error: (action as LogoutFail).payload.error
            }
        case authActions.SIGNUP_REQUEST:
            return {
                ...state,
                loading: true
            }
        case authActions.SIGNUP_SUCCESS:
            return {
                ...state,
                loading: false
            }
        case authActions.SIGNUP_FAIL:
            return {
                ...state,
                loading: false
            }
        default:
            return state;
    }
}