import { MatConfirmDialogComponent } from './mat-confirm-dialog/mat-confirm-dialog.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskCalendarComponent} from './task-calendar/task-calendar.component';
import {MemberListComponent} from './member-list/member-list.component';
import {CalendarModule, DateAdapter} from 'angular-calendar';
import {adapterFactory} from 'angular-calendar/date-adapters/date-fns';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material.module';
import {MemberService} from '../member/member.service';
import { DashboardTemplateComponent } from './dashboard-template/dashboard-template.component';
import { DialogService } from './mat-confirm-dialog/dialog.service';

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
    DashboardTemplateComponent,
    MatConfirmDialogComponent
  ],
  exports: [
    TaskCalendarComponent,
    MemberListComponent,
    DashboardTemplateComponent
  ],
  providers: [
    DialogService,
    MemberService
  ],
  entryComponents: [MatConfirmDialogComponent]
})
export class SharedModule { }
