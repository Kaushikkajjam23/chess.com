import { Color, PieceSymbol, Square } from "chess.js"
import { useState } from "react";
import { MOVE } from "../screens/Game";

export const ChessBoard=({chess,board,socket,setBoard}:{
    setBoard:any;
    chess:any;
    board:({
        square:Square;
        type:PieceSymbol;
        color:Color
    }|null)[][];
    socket:WebSocket;
})=>{
    const [from,setFrom]=useState<null|Square>(null);
    const [to,setTo]=useState<null|Square>(null);
    return <div className="text-white-200 flex">
    {JSON.stringify(board)}
    {board.map((row,i)=>{
        return <div key={i} className="flex">
            {row.map((square,j)=>{
                const squareRepresentation=String.fromCharCode(65+(j%8))+""+(8-i) as Square;
                console.log(squareRepresentation);
                return <div onClick={()=>{
                    if(!from){
                        setFrom(squareRepresentation);
                    }
                    else{
                        socket.send(JSON.stringify({
                            type:MOVE,
                            payload:{
                                move:{
                                    from,
                                    to:squareRepresentation
                                }
                            }
                        }))
                        setFrom(null);
                        chess.move({
                            from,
                            to:squareRepresentation
                        });
                        setBoard(chess.board());
                        console.log({
                            from,to
                        })
                    }
                }} key={j} className={`w-16 h-16 ${(i+j)%2===0 ?'bg-green-500':'bg-white-300'}`}>
                    <div className="w-full justify-center flex h-fullk">
                    <div className="h-full justify-center flex flex-col">
                        {square?<img className="w-4" src={`/${square?.color==="b" ? 
                        square?.type:`${square?.type?.toUpperCase()} copy`} .png`} />:
                        null}
                    </div>
                    </div>

                </div>
            })}
        </div>
    })}
    </div>
}