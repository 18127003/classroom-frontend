import { GetNotificationFail, GetNotificationSuccess, NotificationActions, NotificationState, WsMesssage } from "@/@types/notification.action";
import { authActions, notificationAction } from "@/constants/actions";

const initState: NotificationState = {
    loading: false,
    notification:{
        data:[],
        reload:true
    },
    error:null
}

export const notificationReducer = (state: NotificationState = initState, action: NotificationActions):NotificationState=>{
    switch(action.type){
        case notificationAction.GET_NOTI_REQUEST:
            return {
                ...state,
                loading: true
            }
        case notificationAction.GET_NOTI_SUCCESS:
            return {
                ...state,
                loading: false,
                notification:{
                    data: (action as GetNotificationSuccess).payload.notifications,
                    reload: false
                },
                error:null
            }
        case notificationAction.GET_NOTI_FAIL:
            return {
                ...state,
                loading: false,
                error: (action as GetNotificationFail).payload.error
            }
        case notificationAction.WS_MESSAGE:
            return {
                ...state,
                notification:{
                    data:[
                        (action as WsMesssage).payload,
                        ...state.notification.data
                    ],
                    reload: false
                },
                error: null
            }
        case authActions.LOGOUT_SUCCESS:
            return initState;
        default:
            return state;
    }
}