import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';

import {AppMaterialModule} from '../../app-material.module';
import {AngularClientComponent} from './angular-client.component';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
  ],
  declarations: [
    AngularClientComponent,
  ],
  exports: [
    AngularClientComponent,
  ],
})
export class AngularClientModule {
}
