import { AuthState, AuthAction, AuthSuccess, AuthFail } from "@/@types/auth.action";
import { authActions } from "@/constants/actions";

const initState:AuthState = {loading:false, user: null, error:null}

export const authReducer = (state: AuthState = initState, action: AuthAction):AuthState=>{
    switch(action.type){
        case authActions.LOGIN_REQUEST:
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
        default:
            return state;
    }
}