import {MaterialModule} from './material.module';
import {StoreModule} from '@ngrx/store';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {PreloadAllModules, RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {APP_ROUTES} from './app.routes';
import {API_ENDPOINT} from './app.tokens';
import {DashboardOverviewComponent} from './dashboard/dashboard-overview/dashboard-overview.component';
import {DashboardTemplateComponent} from './dashboard/dashboard-template/dashboard-template.component';
import {HttpClientModule} from '@angular/common/http';
import {EffectsModule} from '@ngrx/effects';
import {SharedModule} from './shared/shared.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    DashboardTemplateComponent,
    DashboardOverviewComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    SharedModule,
    RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: PreloadAllModules } )
  ],
  providers: [
    {provide: API_ENDPOINT, useValue: 'http://localhost:3000'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
