import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';

import {AppMaterialModule} from '../../app-material.module';
import {SignInComponent} from './sign-in.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AppMaterialModule,
  ],
  declarations: [
    SignInComponent,
  ],
  exports: [
    SignInComponent,
  ],
})
export class SignInModule {
}
