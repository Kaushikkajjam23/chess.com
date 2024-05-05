import { useEffect, useState } from "react";
import { Button } from "../components/Button";
import { ChessBoard } from "../components/ChessBoard";
import { useSocket } from "../hooks/useSocket";
import { Chess } from "chess.js";
//TOdo :MoveTogether,there's code repetition here
export const INIT_GAME="init_game";
export const MOVE="move";
export const GAME_OVER="game_over";
export const Game=()=>{
    const socket=useSocket();
    const [chess,setChess]=useState(new Chess());
    const [board,setBoard]=useState(chess.board());
    const [started,setStarted]=useState(false);
    useEffect(() => {
      
    if(!socket){
      return;
      }
      socket.onmessage=(event)=>{
        const message=JSON.parse(event.data);
        console.log(message);
        switch(message.type){
            case INIT_GAME:
                setBoard(chess.board());
                setStarted(true);
                console.log("Game Initialised");
                break;
            case MOVE:
                const move=message.payload;
                chess.move(move);
                setBoard(chess.board());
                console.log("move made");
                break;
            case GAME_OVER:
                console.log("Game Over");
                break;
        }

      }
    }, [socket]);
    
    if(!socket) return <div> Connecting ...</div>
    return <div className="justify-center flex">
        <div className="pt-8 max-w-screen-lg w-full">
            <div className="gird grid-cols-6 gap-4 w-full">
                <div className="col-span-4 bg-red w-full flex justify-center">
                <ChessBoard chess={chess} 
                setBoard ={setBoard}
                socket ={socket} board={board}/>
                </div>
                <div>
                    <div className="col-span-2 bg-slate-900 w-full flex justify-center">
                        {!started && <button onClick={()=>{
                        socket.send(JSON.stringify({
                            type:INIT_GAME,
                            }))
                            }}> Play
                            </button> }
                    </div>
                </div>
            </div>
        </div>
    </div>
}
