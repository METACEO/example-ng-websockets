import {ChangeDetectionStrategy, Component} from '@angular/core';
import {
  AngularClientModel,
  AppAngularClientConnect,
  AppAngularClientAddCount,
  AppAngularClientRemoveCount
} from '@example-ng-websockets/shared';
import {Store} from '@ngrx/store';
import {Observable} from 'rxjs';

import * as reducersRoot from './reducers';
import {WebsocketService} from './services/websocket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'example-ng-websockets-www';

  public getAppClient$: Observable<AngularClientModel> = null;
  public selectAppClients$: Observable<AngularClientModel[]> = null;
  public selectAppId$: Observable<string> = null;
  public selectAppUserNumber$: Observable<string> = null;

  constructor(readonly store: Store<reducersRoot.State>,
              readonly websocketService: WebsocketService) {
    this.getAppClient$ = this.store.select(reducersRoot.getAppClient);
    this.selectAppClients$ = this.store.select(reducersRoot.selectAppClients);
    this.selectAppId$ = this.store.select(reducersRoot.selectAppId);
    this.selectAppUserNumber$ = this.store.select(reducersRoot.selectAppUserNumber);
  }

  onSignIn(angularClient: AngularClientModel): void {
    this.websocketService.dispatch(new AppAngularClientConnect(angularClient), true);
  }

  doAddCount(angularClient: AngularClientModel): void {
    this.websocketService.dispatch(new AppAngularClientAddCount(angularClient), true);
  }

  doRemoveCount(angularClient: AngularClientModel): void {
    this.websocketService.dispatch(new AppAngularClientRemoveCount(angularClient), true);
  }

}
