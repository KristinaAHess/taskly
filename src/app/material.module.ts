import { NgModule } from '@angular/core';
import { MatListModule, MatIconModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';

@NgModule({
  exports: [
    MatListModule,
    MatToolbarModule,
    MatIconModule
  ]
})
export class MaterialModule {}
