import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { ImageUploadModule } from 'angular2-image-upload';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { API_ENDPOINT } from './app.tokens';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardOverviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ImageUploadModule.forRoot(),
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SharedModule,
    RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: PreloadAllModules } ),
  ],
  providers: [
    {provide: API_ENDPOINT, useValue: 'http://localhost:3000'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
