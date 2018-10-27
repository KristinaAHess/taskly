import { Component, Input, OnInit } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';
import { Store } from '@ngrx/store';
import { ApplicationState } from '../../state/app.state';

@Component({
  selector: 'app-task-calendar',
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.css']
})
export class TaskCalendarComponent implements OnInit {

  viewDate: Date = new Date();
  @Input()
  events: CalendarEvent[];

  constructor(private store: Store<ApplicationState>) {
  }

  ngOnInit() {
  }

}
