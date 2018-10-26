import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatCardModule,
  MatListModule,
  MatTabsModule
} from '@angular/material';
import { MatListModule, MatIconModule, MatSidenavModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  exports: [
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatTabsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule
  ]
})
export class MaterialModule {}
