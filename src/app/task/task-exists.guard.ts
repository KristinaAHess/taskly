import { AddTaskAction, LoadTaskByIdAction } from './../state/task/task.actions';
import { Task } from './models/task';
import { TasksQuery } from 'src/app/state/task/task.reducer';
import { TaskService } from './task.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../state/app.state';
import { SelectTaskAction } from '../state/task/task.actions';
import { take, switchMap, tap, map, filter, mapTo } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskExistsGuard implements CanActivate {
  constructor(private store: Store<ApplicationState>) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const taskId = route.paramMap.get('id');
    this.store.dispatch(new SelectTaskAction(+taskId));
    this.store.dispatch(new LoadTaskByIdAction(+taskId));

    return this.store.pipe(
      // select the selected task from the store (will be undefined some times!)
      select(TasksQuery.getSelectedTask),
      // only let it pass, if the task is not undefined
      filter(task => !! task),
      // as soon as a defined task passes the pipeline, return true (routing happens)
      mapTo(true)
    );
  }
}
