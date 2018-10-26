import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { Task } from 'src/app/task/models/task';

import { TaskService } from './../../task/task.service';
import {
  AddTaskSuccessAction,
  LoadTasksSuccessAction,
  TaskActionTypes,
  RemoveTaskAction,
  RemoveTaskSuccessAction,
  UpdateTaskAction,
  UpdateTaskSuccessAction,
} from './task.actions';

@Injectable({
  providedIn: 'root'
})
export class TaskEffects {
  constructor(private actions$: Actions, private tasksService: TaskService, private router: Router) {}

  @Effect() getTasks$ = this.actions$.pipe(
    ofType(TaskActionTypes.LOAD_TASKS),
    switchMap(payload => this.tasksService.getTasks()),
    map((tasks: Array<Task>) => new LoadTasksSuccessAction(tasks))
  );

  @Effect() updateTask$ = this.actions$.pipe(
    ofType(TaskActionTypes.UPDATE_TASK),
    map((action: UpdateTaskAction) => action.payload),
    concatMap((task: Task) => this.tasksService.updateTask(task)),
    tap((task: Task) => this.router.navigate(['/tasks', task.id])),
    map((task: Task) => new UpdateTaskSuccessAction(task))
  );

  @Effect() addTask$ = this.actions$.pipe(
    ofType(TaskActionTypes.ADD_TASK),
    map((action: UpdateTaskAction) => action.payload),
    concatMap((task: Task) => this.tasksService.updateTask(task)),
    tap((task: Task) => this.router.navigate(['/tasks', task.id])),
    map((task: Task) => new AddTaskSuccessAction(task))
  );

  @Effect() removeTask$ = this.actions$.pipe(
    ofType(TaskActionTypes.REMOVE_TASK),
    map((action: RemoveTaskAction) => action.payload),
    concatMap((task: Task) => this.tasksService.removeTask(String(task.id))),
    map((task: Task) => new RemoveTaskSuccessAction(task))
  );
}
