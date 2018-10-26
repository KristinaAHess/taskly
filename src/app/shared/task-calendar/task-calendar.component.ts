import { Component, OnInit } from '@angular/core';
import {CalendarEvent} from 'angular-calendar';

@Component({
  selector: 'app-task-calendar',
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.css']
})
export class TaskCalendarComponent implements OnInit {

  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    {
      start: new Date(),
      title: 'An event with no end date',
      allDay: true
    },
    {
      start: new Date(),
      title: 'A second event',
      allDay: true
    }];

  constructor() { }

  ngOnInit() {
  }

}
