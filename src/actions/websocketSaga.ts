import { ClassNotification } from "@/@types/model";
import { WsMesssage } from "@/@types/notification.action";
import { authActions, notificationAction } from "@/constants/actions";
import { TEST_WEBSOCKET_SERVER_URL, WEBSOCKET_SERVER_BASE_URL } from "@/constants/common";
import { AppState } from "@/reducers";
import { Client } from "@stomp/stompjs";
import { eventChannel } from "redux-saga";
import { call, put, select, take, takeEvery } from "redux-saga/effects";

const createSocketChannel = (socket: Client) => {
    return eventChannel(emit => {
        const pingHandler = (msg) => {
            emit(msg.body)
        }
        
        const errorHandler = (errorEvent) => {
            emit(new Error(errorEvent.reason))
        }

        socket.onConnect = (frame)=>{
            socket.subscribe('/user/topic/noti',pingHandler)
            
        }
        socket.onWebSocketError = errorHandler        
        socket.activate()
        const unsubscribe = () => {
            socket.unsubscribe('/user/topic/noti')
        }
        return unsubscribe
    })
}

const createWebSocketConnection = (id:string)=> {
    return new Client({
        // brokerURL: TEST_WEBSOCKET_SERVER_URL,
        brokerURL: WEBSOCKET_SERVER_BASE_URL,
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
        connectHeaders:{
            'username':id
        }
    })
}

const wsMessage = (payload: ClassNotification):WsMesssage =>({
    type: notificationAction.GET_NOTI_SUCCESS,
    payload: payload
});


function* websocketSaga() {
    const userId = yield select((state:AppState)=>state.auth.user.id)
    const socket = yield call(createWebSocketConnection, userId)
    const socketChannel = yield call(createSocketChannel, socket)
    

    while (true) {
        try {
            const payload = yield take(socketChannel)
            var noti: ClassNotification = JSON.parse(payload)
            console.log(noti)
            yield put(wsMessage(noti))
        } catch(err) {
            console.error('socket error:', err)
        }
    }
}

export function* wsWatcher(){
    yield takeEvery(authActions.LOGIN_SUCCESS, websocketSaga)
}

export default wsWatcher


