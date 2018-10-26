import { Task } from 'src/app/task/models/task';
import { Action } from '@ngrx/store';
import {CalendarEvent} from 'angular-calendar';

export enum TaskActionTypes {
  LOAD_TASKS = '[Tasks] Load Tasks',
  LOAD_TASKS_SUCCESS = '[Tasks] Load Tasks Success',
  ADD_TASK = '[Tasks] Add task',
  ADD_TASK_SUCCESS = '[Tasks] Add task success',
  REMOVE_TASK = '[Tasks] Remove task',
  REMOVE_TASK_SUCCESS = '[Tasks] Remove task success',
  UPDATE_TASK = '[Tasks] Update task',
  UPDATE_TASK_SUCCESS = '[Tasks] Update task success',
  SELECT_TASK = '[Tasks] Select task',
  CALCULATE_EVENTS = '[Tasks] Calculate dates',
  CALCULATE_EVENTS_SUCCESS = '[Tasks] Calculate dates success'
}

export class LoadTasksAction implements Action {
  readonly type = TaskActionTypes.LOAD_TASKS;
}

export class LoadTasksSuccessAction implements Action {
  readonly type = TaskActionTypes.LOAD_TASKS_SUCCESS;

  constructor(public payload: Array<Task>) {}
}

export class AddTaskAction implements Action {
  readonly type = TaskActionTypes.ADD_TASK;

  constructor(public payload: Task) {}
}

export class AddTaskSuccessAction implements Action {
  readonly type = TaskActionTypes.ADD_TASK_SUCCESS;

  constructor(public payload: Task) {}
}

export class RemoveTaskAction implements Action {
  readonly type = TaskActionTypes.REMOVE_TASK;

  constructor(public payload: Task) {}
}

export class RemoveTaskSuccessAction implements Action {
  readonly type = TaskActionTypes.REMOVE_TASK_SUCCESS;

  constructor(public payload: Task) {}
}

export class UpdateTaskAction implements Action {
  readonly type = TaskActionTypes.UPDATE_TASK;

  constructor(public payload: Task) {}
}

export class UpdateTaskSuccessAction implements Action {
  readonly type = TaskActionTypes.UPDATE_TASK_SUCCESS;

  constructor(public payload: Task) {}
}

export class SelectTaskAction implements Action {
  readonly type = TaskActionTypes.SELECT_TASK;

  constructor(public payload: number) {}
}

export class CalculateEventsAction implements Action {
  readonly type = TaskActionTypes.CALCULATE_EVENTS;
}

export class CalculateEventsSuccessAction implements Action {
  readonly type = TaskActionTypes.CALCULATE_EVENTS_SUCCESS;

  constructor(public payload: Array<CalendarEvent>) {}
}

export type TasksActions =
  | LoadTasksAction
  | LoadTasksSuccessAction
  | AddTaskAction
  | AddTaskSuccessAction
  | RemoveTaskAction
  | RemoveTaskSuccessAction
  | UpdateTaskAction
  | UpdateTaskSuccessAction
  | SelectTaskAction
  | CalculateEventsAction
  | CalculateEventsSuccessAction;
