import {AppStateInterface, AppReducer, AppGetClient} from '@example-ng-websockets/shared';
import {ActionReducerMap, createFeatureSelector, createSelector, MetaReducer} from '@ngrx/store';

import {environment} from '../../environments/environment';

export interface State {
  app: AppStateInterface;
}

export const reducers: ActionReducerMap<State> = {
  app: AppReducer,
};

export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

export const selectApp = createFeatureSelector<State, AppStateInterface>('app');
export const selectAppClients = createSelector(selectApp, (state: AppStateInterface) => state.clients);
export const selectAppId = createSelector(selectApp, (state: AppStateInterface) => state.id);
export const selectAppUserNumber = createSelector(selectApp, (state: AppStateInterface) => state.userNumber);
export const selectAppWebsocketConnected = createSelector(selectApp, (state: AppStateInterface) => state.websocketConnected);
export const getAppClient = createSelector(selectApp, AppGetClient);
