import { Task } from 'src/app/task/models/task';
import { Action } from '@ngrx/store';

export enum TaskActionTypes {
  LOAD_TASKS = '[Tasks] Load Tasks',
  LOAD_TASKS_SUCCESS = '[Tasks] Load Tasks Success',
  LOAD_TASK_BY_ID = '[Tasks] Load Task by id',
  LOAD_TASK_BY_ID_SUCCESS = '[Tasks] Load Task by id Success',
  ADD_TASK = '[Tasks] Add task',
  ADD_TASK_SUCCESS = '[Tasks] Add task success',
  REMOVE_TASK = '[Tasks] Remove task',
  REMOVE_TASK_SUCCESS = '[Tasks] Remove task success',
  UPDATE_TASK = '[Tasks] Update task',
  UPDATE_TASK_SUCCESS = '[Tasks] Update task success',
  SELECT_TASK = '[Tasks] Select task'
}

export class LoadTasksAction implements Action {
  readonly type = TaskActionTypes.LOAD_TASKS;
}

export class LoadTasksSuccessAction implements Action {
  readonly type = TaskActionTypes.LOAD_TASKS_SUCCESS;

  constructor(public payload: Array<Task>) {}
}

export class LoadTaskByIdAction implements Action {
  readonly type = TaskActionTypes.LOAD_TASK_BY_ID;

  constructor(public payload: number) {}
}

export class LoadTaskByIdSuccessAction implements Action {
  readonly type = TaskActionTypes.LOAD_TASK_BY_ID_SUCCESS;

  constructor(public payload: Task) {}
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

  constructor(public payload: string) {}
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

export type TasksActions =
  | LoadTasksAction
  | LoadTasksSuccessAction
  | LoadTaskByIdAction
  | LoadTaskByIdSuccessAction
  | AddTaskAction
  | AddTaskSuccessAction
  | RemoveTaskAction
  | RemoveTaskSuccessAction
  | UpdateTaskAction
  | UpdateTaskSuccessAction
  | SelectTaskAction;
