import { TaskService } from './task/task.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { API_ENDPOINT } from './app.tokens';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { MaterialModule } from './material.module';
import { SharedModule } from './shared/shared.module';
import { ROOT_REDUCER } from './state/app.state';
import { MemberEffects } from './state/member/member.effects';
import { TaskEffects } from './state/task/task.effects';

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
    StoreModule.forRoot(ROOT_REDUCER),
    EffectsModule.forRoot([MemberEffects, TaskEffects]),
    SharedModule,
    RouterModule.forRoot(APP_ROUTES, { preloadingStrategy: PreloadAllModules } ),
    StoreDevtoolsModule.instrument()
  ],
  providers: [
    TaskService,
    {provide: API_ENDPOINT, useValue: 'http://localhost:3000'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
