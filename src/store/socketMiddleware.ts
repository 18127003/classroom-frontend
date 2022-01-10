import { notificationAction } from "@/constants/actions";
import { Client } from "@stomp/stompjs";
import { MiddlewareAPI } from "redux";
import { eventChannel } from "redux-saga";
import { apply, call, fork, put, take } from "redux-saga/effects";

// this function creates an event channel from a given socket
// Setup subscription to incoming `ping` events
function createSocketChannel(socket: Client) {
// `eventChannel` takes a subscriber function
// the subscriber function takes an `emit` argument to put messages onto the channel
    return eventChannel(emit => {

        const pingHandler = (msg) => {
        // puts event payload into the channel
        // this allows a Saga to take this payload from the returned channel
            emit(msg)
        }
        
        const errorHandler = (errorEvent) => {
        // create an Error object and put it into the channel
            emit(new Error(errorEvent.reason))
        }

        socket.onConnect = (frame)=>{
            console.log('connect')
            socket.subscribe('/topic/noti',pingHandler)
            
        }
        socket.onWebSocketError = errorHandler
        
        // setup the subscription
        
        socket.activate()
        // socket.on('ping', pingHandler)
        // socket.on('error', errorHandler)
        

        // the subscriber must return an unsubscribe function
        // this will be invoked when the saga calls `channel.close` method
        const unsubscribe = () => {
        // socket.off('ping', pingHandler)
            socket.unsubscribe('topic/noti')
        }

        return unsubscribe
    })
}
  
  // reply with a `pong` message by invoking `socket.emit('pong')`
function* pong(socket) {
    yield apply(socket, socket.emit, ['pong']) // call `emit` as a method with `socket` as context
}
  
export function* watchOnPings() {
    const socket = yield call(createWebSocketConnection)
    const socketChannel = yield call(createSocketChannel, socket)

    while (true) {
        try {
        // An error from socketChannel will cause the saga jump to the catch block
        const payload = yield take(socketChannel)
        yield put({ type: notificationAction.WS_MESSAGE, payload })
        yield fork(pong, socket)
        } catch(err) {
        console.error('socket error:', err)
        // socketChannel is still open in catch block
        // if we want end the socketChannel, we need close it explicitly
        // socketChannel.close()
        }
    }
}

const createWebSocketConnection = ()=> {
    return new Client({
        brokerURL: 'ws://localhost:8080/ws',
        reconnectDelay: 5000,
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
    })
}
