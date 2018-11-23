import {AngularClientModel} from '../models';
import {AppStateInterface} from '../interfaces';

export enum AppActionTypes {
    AppAngularClientConnect = '[App] Angular Client Connect',
    AppAngularClientDisconnect = '[App] Angular Client Disconnect',
    AppAngularClientAddCount = '[App] Angular Client Add Count',
    AppAngularClientRemoveCount = '[App] Angular Client Remove Count',
    AppWebsocketConnected = '[App] Websocket Connected',
    AppWebsocketInitialized = '[App] Websocket Initialized',
    AppWebsocketDisconnected = '[App] Websocket Disconnected',
}

export class AppAngularClientConnect {
    readonly type = AppActionTypes.AppAngularClientConnect;

    constructor(readonly angularClient: AngularClientModel) {
    }
}

export class AppAngularClientDisconnect {
    readonly type = AppActionTypes.AppAngularClientDisconnect;

    constructor(readonly id: string) {
    }
}

export class AppAngularClientAddCount {
    readonly type = AppActionTypes.AppAngularClientAddCount;

    constructor(readonly angularClient: AngularClientModel) {
    }
}

export class AppAngularClientRemoveCount {
    readonly type = AppActionTypes.AppAngularClientRemoveCount;

    constructor(readonly angularClient: AngularClientModel) {
    }
}

export class AppWebsocketConnected {
    readonly type = AppActionTypes.AppWebsocketConnected;
}

export class AppWebsocketInitialized {
    readonly type = AppActionTypes.AppWebsocketInitialized;

    constructor(readonly appState: AppStateInterface) {
    }
}

export class AppWebsocketDisconnected {
    readonly type = AppActionTypes.AppWebsocketDisconnected;
}

export type AppActions =
    | AppAngularClientConnect
    | AppAngularClientDisconnect
    | AppAngularClientAddCount
    | AppAngularClientRemoveCount
    | AppWebsocketConnected
    | AppWebsocketInitialized
    | AppWebsocketDisconnected;
