import { TasksQuery } from 'src/app/state/task/task.reducer';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concatMap, filter, map, switchMap, tap } from 'rxjs/operators';
import { Task } from 'src/app/task/models/task';
import { CalendarEvent } from 'angular-calendar';

import { TaskService } from './../../task/task.service';
import {
  AddTaskSuccessAction,
  CalculateEventsSuccessAction,
  LoadTaskByIdAction,
  LoadTaskByIdSuccessAction,
  LoadTasksSuccessAction,
  RemoveTaskAction,
  RemoveTaskSuccessAction,
  TaskActionTypes,
  UpdateTaskAction,
  UpdateTaskSuccessAction
} from './task.actions';
import { EventService } from '../../task/event.service';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from '../app.state';

@Injectable({
  providedIn: 'root'
})
export class TaskEffects {
  constructor(
    private actions$: Actions,
    private tasksService: TaskService,
    private eventsService: EventService,
    private router: Router,
    private store: Store<ApplicationState>) {
  }

  @Effect() getTasks$ = this.actions$.pipe(
    ofType(TaskActionTypes.LOAD_TASKS),
    this.filterIfLoaded(TasksQuery.getTasksLoaded),
    switchMap(payload => this.tasksService.getTasks()),
    map((tasks: Array<Task>) => new LoadTasksSuccessAction(tasks))
  );

  @Effect() getTaskById$ = this.actions$.pipe(
    ofType(TaskActionTypes.LOAD_TASK_BY_ID),
    map((action: LoadTaskByIdAction) => action.payload),
    this.filterIfLoaded(TasksQuery.getTasksLoaded),
    switchMap(payload => this.tasksService.getTask(String(payload))),
    map((task: Task) => new LoadTaskByIdSuccessAction(task))
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
    concatMap((task: Task) => this.tasksService.createTask(task)),
    tap((task: Task) => this.router.navigate(['/tasks', task.id])),
    map((task: Task) => new AddTaskSuccessAction(task))
  );

  @Effect() removeTask$ = this.actions$.pipe(
    ofType(TaskActionTypes.REMOVE_TASK),
    map((action: RemoveTaskAction) => action.payload),
    concatMap((task: Task) => this.tasksService.removeTask(String(task.id))),
    map((task: Task) => new RemoveTaskSuccessAction(task))
  );

  @Effect() calculateEvents$ = this.actions$.pipe(
    ofType(TaskActionTypes.CALCULATE_EVENTS),
    switchMap(payload => this.eventsService.calculateEvents()),
    map((events: Array<CalendarEvent>) => new CalculateEventsSuccessAction(events))
  );

  private filterIfLoaded(fn) {
    return source => source.pipe(
      switchMap(payload => this.store.pipe(
        select(fn),
        map(loaded => {
          return {loaded, payload};
        })
        )
      ),
      filter((res: { loaded: boolean, payload: any }) => !res.loaded),
      map((res: { loaded: boolean, payload: any }) => res.payload)
    );
  }
}
