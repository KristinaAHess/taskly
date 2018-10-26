import { LoadTasksAction } from './../../state/task/task.actions';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationState } from 'src/app/state/app.state';

import { Task } from '../models/task';
import { TasksQuery } from './../../state/task/task.reducer';

@Component({
  selector: 'app-task-dashboard',
  templateUrl: './task-dashboard.component.html',
  styleUrls: ['./task-dashboard.component.css']
})
export class TaskDashboardComponent implements OnInit {

  tasks$: Observable<Array<Task>>;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadTasksAction());
    this.tasks$ = this.store.pipe(select(TasksQuery.getTasks));
  }

}
