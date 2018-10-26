import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { PreloadAllModules, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { API_ENDPOINT } from './app.tokens';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { DashboardTemplateComponent } from './dashboard/dashboard-template/dashboard-template.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardTemplateComponent,
    DashboardOverviewComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: PreloadAllModules } ),
  ],
  providers: [
    {provide: API_ENDPOINT, useValue: 'http://localhost:3000'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
