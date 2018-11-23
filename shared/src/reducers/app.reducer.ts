import {find, without} from 'lodash';

import * as appActions from '../actions/app.actions';
import {AppStateInterface} from '../interfaces';
import {AngularClientModel} from '../models';

export const AppInitialState: AppStateInterface = {
    clients: [],
    id: null,
    userNumber: null,
    websocketConnected: null,
};

export function AppReducer(state: AppStateInterface = AppInitialState, action: appActions.AppActions): AppStateInterface {
    switch (action.type) {

        case appActions.AppActionTypes.AppAngularClientConnect: {
            return {
                ...state,
                clients: [
                    ...state.clients,
                    action.angularClient,
                ],
            };
        }

        case appActions.AppActionTypes.AppAngularClientDisconnect: {
            const angularClient = find(state.clients, ['id', action.id]);
            if (!angularClient) {
                return state;
            }
            return {
                ...state,
                clients: without(state.clients, angularClient),
            };
        }

        case appActions.AppActionTypes.AppAngularClientAddCount: {
            return {
                ...state,
                clients: state.clients
                    .map((angularClient) => {
                        if (angularClient.id === action.angularClient.id) {
                            return new AngularClientModel(
                                angularClient.id,
                                angularClient.userNumber,
                                angularClient.name,
                                angularClient.count + 1
                            );
                        }
                        return angularClient;
                    })
                    .sort((a, b) => b.count - a.count),
        }
        }

        case appActions.AppActionTypes.AppAngularClientRemoveCount: {
            return {
                ...state,
                clients: state.clients
                    .map((angularClient) => {
                        if (angularClient.id === action.angularClient.id) {
                            return new AngularClientModel(
                                angularClient.id,
                                angularClient.userNumber,
                                angularClient.name,
                                angularClient.count - 1
                            );
                        }
                        return angularClient;
                    })
                    .sort((a, b) => b.count - a.count),
            }
        }

        case appActions.AppActionTypes.AppWebsocketConnected: {
            return {
                ...state,
                websocketConnected: true,
            };
        }

        case appActions.AppActionTypes.AppWebsocketInitialized: {
            return {
                ...action.appState,
            };
        }

        case appActions.AppActionTypes.AppWebsocketDisconnected: {
            return {
                ...state,
                websocketConnected: false,
            };
        }

        default:
            return state;
    }
}

export function AppGetClient(state: AppStateInterface): AngularClientModel {
    const {clients, id} = state;
    if (clients) {
        for (const client of clients) {
            if (client.id === id) {
                return client;
            }
        }
    }
    return null;
}
