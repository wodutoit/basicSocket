import { WebSocketGateway, WebSocketServer, SubscribeMessage, OnGatewayConnection, OnGatewayDisconnect, MessageBody, WsResponse } from '@nestjs/websockets';
import { from, Observable } from 'rxjs';

@WebSocketGateway()
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;
    users: number = 0;
    
    async handleConnection(){

        // A client has connected
        this.users++;

        // Notify connected clients of current users
        this.server.emit('users', this.users);
        console.log(`connection user count: ${this.users}`);

    }

    async handleDisconnect(){

        // A client has disconnected
        this.users--;

        // Notify connected clients of current users
        this.server.emit('users', this.users);

    }

    @SubscribeMessage('chat')
    onChat(@MessageBody() data: string): string {
        console.log(`server received chat ${data}`);
        this.server.emit('chat', data);
        return data;
    }
}