import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AppMaterialModule} from '../../app-material.module';
import {ToolbarComponent} from './toolbar.component';

@NgModule({
  imports: [
    CommonModule,
    AppMaterialModule,
  ],
  declarations: [
    ToolbarComponent,
  ],
  exports: [
    ToolbarComponent,
  ],
})
export class ToolbarModule {
}
