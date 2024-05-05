import { useEffect, useState } from "react"
const WS_URL="ws://localhost:3001"
export const useSocket=()=>{
    const [socket,SetSocket]=useState<WebSocket|null>(null);

    useEffect(() => {
      const ws=new WebSocket(WS_URL);
      ws.onopen=()=>{
        SetSocket(ws);
      }
      ws.onclose=()=>{
        SetSocket(null);
      }
      return()=>{
        ws.close();
      }
    }, [])
    
    return socket;
}