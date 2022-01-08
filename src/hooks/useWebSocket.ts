import { useEffect, useState } from "react"
import {Client} from "@stomp/stompjs"

const useWebSocket = ()=>{
    const [wsClient, setWsClient] = useState<Client|null>(null)
    useEffect(()=>{
        if(wsClient===null){
            console.log("Init")
            const client = new Client({
                brokerURL: 'ws://localhost:8080/ws',
                onConnect:(frame)=>{console.log('connect')},
                reconnectDelay: 5000,
                heartbeatIncoming: 4000,
                heartbeatOutgoing: 4000,
            })
            client.activate()
            
            setWsClient(client)
            
        }
    },[wsClient])

    return wsClient;
}

export default useWebSocket