import { notificationAction } from "@/constants/actions";
import { ClassNotification } from "./model";

export interface NotificationState {
    loading: boolean,
    notification: {
        data: ClassNotification[],
        reload: boolean
    },
    error: string|null,
}

export interface NotificationFailPayload{
    error: string
}

export interface GetNotificationSuccessPayload{
    notifications: ClassNotification[]
}

export interface GetNotificationRequest{
    type: typeof notificationAction.GET_NOTI_REQUEST
}

export interface GetNotificationSuccess{
    type: typeof notificationAction.GET_NOTI_SUCCESS,
    payload: GetNotificationSuccessPayload
}

export interface GetNotificationFail{
    type: typeof notificationAction.GET_NOTI_FAIL,
    payload: NotificationFailPayload
}

export interface WsMesssage {
    type: typeof notificationAction.WS_MESSAGE,
    payload: ClassNotification
}

export type NotificationActions = 
    | GetNotificationRequest
    | GetNotificationSuccess
    | GetNotificationFail
    | WsMesssage