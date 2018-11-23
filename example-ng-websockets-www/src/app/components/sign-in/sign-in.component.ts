import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {AngularClientModel} from '@example-ng-websockets/shared';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {

  @Input() appId: string;
  @Input() appUserNumber: string;
  @Input() title: string;
  @Output() onSignIn: EventEmitter<AngularClientModel> = new EventEmitter<AngularClientModel>();

  name = new FormControl('', [Validators.required]);

  doSignIn(): void {
    if (this.name.valid) {
      const id = this.appId;
      const userNumber = this.appUserNumber;
      const name = this.name.value;
      const count = 0;
      this.onSignIn.emit(new AngularClientModel(id, userNumber, name, count));
    }
  }

  getErrorMessage() {
    return this.name.hasError('required') ? 'You must enter a value' : '';
  }

}
