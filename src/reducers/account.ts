import { AccountAction, AccountState, InitAccountSuccess, UpdateFail, UpdateSuccess } from "@/@types/account.action";
import { accountAction, authActions } from "@/constants/actions";

const initState:AccountState = {loading:false, detail: null, error:null}

export const accountReducer = (state: AccountState = initState, action: AccountAction):AccountState=>{
    switch(action.type){
        case accountAction.UPDATE_ACCOUNT_REQUEST:
            return {
                ...state,
                loading: true
            };
        case accountAction.UPDATE_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                detail: (action as UpdateSuccess).payload.user,
                error:null
            };
        case accountAction.UPDATE_ACCOUNT_FAIL:
            return {
                ...state,
                loading: false,
                error:(action as UpdateFail).payload.error
            };
        case accountAction.UPDATE_PASSWORD_REQUEST:
            return {
                ...state,
                loading: true
            };
        case accountAction.UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                loading: false
            };
        case accountAction.UPDATE_PASSWORD_FAIL:
            return {
                ...initState,
                loading: false
            };
        case accountAction.INIT_ACCOUNT_REQUEST:
            return {
                ...state,
                loading:true
            }
        case accountAction.INIT_ACCOUNT_SUCCESS:
            return {
                ...state,
                loading: false,
                detail: (action as InitAccountSuccess).payload.detail
            }
        case authActions.LOGOUT_SUCCESS:
            return initState;
        default:
            return state;
    }
}