import { GetNotificationFail, GetNotificationRequest, GetNotificationSuccess, GetNotificationSuccessPayload, NotificationFailPayload, NotificationState } from "@/@types/notification.action";
import { notificationAction } from "@/constants/actions";
import { accountService } from "@/services";
import { Client } from "@stomp/stompjs";
import { eventChannel } from "redux-saga";
import { all, call, put, takeLatest } from "redux-saga/effects";

export const getNotificationRequest = (): GetNotificationRequest => ({
    type: notificationAction.GET_NOTI_REQUEST
});

export const getNotificationSuccess = (payload: GetNotificationSuccessPayload):GetNotificationSuccess =>({
    type: notificationAction.GET_NOTI_SUCCESS,
    payload: payload
});

export const getNotificationFail = (payload: NotificationFailPayload):GetNotificationFail =>({
    type: notificationAction.GET_NOTI_FAIL,
    payload: payload
});

function* getNotificationSaga(action: GetNotificationRequest) {
    try {
        const res = yield call(accountService.getNotification);
        yield put(getNotificationSuccess({
           notifications : res.data
        }))
    } catch (e) {
        yield put(getNotificationFail({
            error: 'Get notification failed'
        }))
    }
}

export function* notificationSaga() {

    yield all([
        takeLatest(notificationAction.GET_NOTI_REQUEST, getNotificationSaga)
    ]);
}


export default notificationSaga;