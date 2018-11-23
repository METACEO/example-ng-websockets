import {Injectable} from '@angular/core';
import {AppWebsocketConnected, AppWebsocketDisconnected} from '@example-ng-websockets/shared';
import {Store} from '@ngrx/store';

import * as reducersState from '../reducers';

declare const io;

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  private _ws: any = null;

  constructor(readonly store: Store<reducersState.State>) {
    this._connect();
  }

  public dispatch(data: any, dispatchToSelf = false): void {
    if (dispatchToSelf) {
      this.store.dispatch(data);
    }
    this._ws.emit('action', data);
  }

  private _connect(): void {
    if (this._ws) {
      this._ws.disconnect();
    }
    this._ws = io('http://localhost:3000') as any;
    this._ws.on('connect', () => this.store.dispatch(new AppWebsocketConnected()));
    this._ws.on('action', (broadcastedAction) => this.store.dispatch(broadcastedAction));
    this._ws.on('disconnect', () => this.store.dispatch(new AppWebsocketDisconnected()));
  }

}
