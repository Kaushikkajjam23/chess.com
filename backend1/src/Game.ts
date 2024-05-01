import { WebSocket } from "ws";
import { Chess } from 'chess.js'
import { GAME_OVER, INIT_GAME, MOVE } from "./messages";
export class Game{
    public player1:WebSocket;
    public player2:WebSocket;
    private board: Chess;
    private startTime:Date;
    
    constructor(player1:WebSocket,player2:WebSocket)
    {
        this.player1=player1;
        this.player2=player2;
        this.board=new Chess();
        this.startTime=new Date();
        
        this.player1.send(JSON.stringify({
            type:INIT_GAME,
            paylaod:{
                color:"white"
            }
        }));
        this.player2.send(JSON.stringify({
            type:INIT_GAME,
            paylaod:{
                color:"black"
            }
        }));
    }
    makeMove(socket:WebSocket,move:{
        from:string;
        to:string;
    })
    {
        //validate the type of move using zod
        //player1 turn ayithe player1 eh adali if player2 tries then return 
        if(this.board.moves.length%2===0 && socket!== this.player1)
        return
        //player2 turn ayithe player2 eh adali if player1 tries then return 
        if(this.board.moves.length%2!==0 && socket!== this.player2)
            return
        //should perform validation here
        //Is this Users move
        //is this move valid
        try{
            this.board.move(move);
        }catch(e)
        {
            console.log(e);
            return;
        }
        //update the board: chess.js librarry is handling this thing thankfully
        //push the move
        //send the updated board to both he users

        //check if the game is Over
        if(this.board.isGameOver())
        {
            this.player1.emit(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn()==="w"?"black":"white"
                }
            }));
            this.player2.emit(JSON.stringify({
                type:GAME_OVER,
                payload:{
                    winner:this.board.turn()==="w"?"black":"white"
                }
            }));
            return ;
        }
        
        //if game is not over
        if(this.board.moves.length%2==0)
        {
            this.player2.emit(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }
        else{
            this.player1.emit(JSON.stringify({
                type:MOVE,
                payload:move
            }))
        }
    }
}