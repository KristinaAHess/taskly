import { NgModule } from '@angular/core';

import {
  MatListModule, MatSidenavModule,
} from '@angular/material';

@NgModule({
  exports: [
    MatListModule,
    MatSidenavModule
  ]
})
export class MaterialModule {}
