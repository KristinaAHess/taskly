import {Component, Input, OnInit} from '@angular/core';
import {CalendarEvent} from 'angular-calendar';
import {ApplicationState} from '../../state/app.state';
import {select, Store} from '@ngrx/store';
import {MembersQuery} from '../../state/member/member.reducer';
import {TaskService} from '../../task/task.service';

@Component({
  selector: 'app-task-calendar',
  templateUrl: './task-calendar.component.html',
  styleUrls: ['./task-calendar.component.css']
})
export class TaskCalendarComponent implements OnInit {

  viewDate: Date = new Date();
  @Input()
  events: CalendarEvent[];

  constructor(private store: Store<ApplicationState>, private taskService: TaskService) { }

  ngOnInit() {
  }

  distributeTasks() {
    this.store.pipe(select(MembersQuery.getMembers)).subscribe((members) => this.taskService.distributeTasks(members));
  }

}
