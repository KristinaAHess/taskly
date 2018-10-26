import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatTabsModule
} from '@angular/material';

@NgModule({
  exports: [
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule
  ]
})
export class MaterialModule {
}
