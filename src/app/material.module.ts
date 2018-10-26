import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatListModule
} from '@angular/material';

@NgModule({
  exports: [
    MatListModule,
    MatCardModule,
    MatButtonModule,
  ]
})
export class MaterialModule {}
