import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {MemberModule} from './member/member.module';
import {TaskModule} from './task/task.module';
import { API_ENDPOINT } from './app.tokens';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MemberModule,
    TaskModule,
  ],
  providers: [
    {provide: API_ENDPOINT, useValue: 'http://localhost:3000'},
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
