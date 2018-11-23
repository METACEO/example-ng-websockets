import {
    AppAngularClientDisconnect,
    AppInitialState,
    AppReducer,
    AppStateInterface,
    AppWebsocketInitialized,
} from '@example-ng-websockets/shared';
import {
    OnGatewayConnection,
    OnGatewayDisconnect,
    SubscribeMessage,
    WebSocketGateway,
    WebSocketServer,
    WsResponse
} from '@nestjs/websockets';
import {get} from 'lodash';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server;

    private appState: AppStateInterface = AppInitialState;
    private sockets: any[] = [];
    private count = 0;

    handleConnection(socket) {
        const id = get(socket, 'id') as string;
        const userNumber = (++this.count).toString();
        if (id) {
            this.sockets.push(socket);
            socket.emit('action', new AppWebsocketInitialized({
                ...this.appState,
                id,
                userNumber,
            }));
        }
    }

    handleDisconnect(socket) {
        const id = get(socket, 'id') as string;
        if (id) {
            const appAngularClientDisconnect = new AppAngularClientDisconnect(id);
            this.appState = AppReducer(this.appState, appAngularClientDisconnect);
            this.sockets = this.sockets.filter(peerSocket => peerSocket !== socket);
            this.sockets.forEach(peerSocket => peerSocket.emit('action', appAngularClientDisconnect));
        }
    }

    @SubscribeMessage('action')
    action(socket, data): void {
        this.appState = AppReducer(this.appState, data);
        this.sockets
            .filter(peerSocket => peerSocket !== socket)
            .forEach(peerSocket => peerSocket.emit('action', data));
    }

}
