import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskCalendarComponent} from './task-calendar/task-calendar.component';
import {MemberListComponent} from './member-list/member-list.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import {MemberService} from '../member/member.service';

@NgModule({
  imports: [
    CommonModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    RouterModule,
    MaterialModule
  ],
  declarations: [
    TaskCalendarComponent,
    MemberListComponent,
  ],
  exports: [
    TaskCalendarComponent,
    MemberListComponent,
  ],
  providers: [
    MemberService
  ]
})
export class SharedModule { }
