import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {AngularClientModel} from '@example-ng-websockets/shared';

@Component({
  selector: 'app-angular-client',
  templateUrl: './angular-client.component.html',
  styleUrls: ['./angular-client.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AngularClientComponent {

  @Input() client: AngularClientModel;
  @Output() onAddCount: EventEmitter<AngularClientModel> = new EventEmitter<AngularClientModel>();
  @Output() onRemoveCount: EventEmitter<AngularClientModel> = new EventEmitter<AngularClientModel>();

  doAddCount(): void {
    this.onAddCount.emit(this.client);
  }

  doRemoveCount(): void {
    this.onRemoveCount.emit(this.client);
  }

}
