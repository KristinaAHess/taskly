import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, mapTo } from 'rxjs/operators';
import { TasksQuery } from 'src/app/state/task/task.reducer';

import { ApplicationState } from '../state/app.state';
import { SelectTaskAction } from '../state/task/task.actions';
import { LoadTaskByIdAction } from './../state/task/task.actions';

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
