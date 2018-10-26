import { AddTaskAction } from './../state/task/task.actions';
import { Task } from './models/task';
import { TasksQuery } from 'src/app/state/task/task.reducer';
import { TaskService } from './task.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../state/app.state';
import { SelectTaskAction } from '../state/task/task.actions';
import { take, switchMap, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskExistsGuard implements CanActivate {
  constructor(private store: Store<ApplicationState>, private taskService: TaskService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const taskId = route.paramMap.get('id');
    this.store.dispatch(new SelectTaskAction(+taskId));

    return this.store.pipe(
      select(TasksQuery.getTasksLoaded),
      take(1),
      switchMap(loaded => {
        const addTaskToList = (task: Task) => this.store.dispatch(new AddTaskAction(task));
        return loaded ? of(true) : this.taskService.getTask(taskId).pipe(
            tap(addTaskToList),
            map(task => !!task)
          );
      })
    );
  }
}