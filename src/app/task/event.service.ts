import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from '../state/app.state';
import { TasksQuery } from '../state/task/task.reducer';
import { map } from 'rxjs/operators';

@Injectable
export class EventService {
  constructor(private store: Store<ApplicationState>) {
  }

  calculateEvents() {
    // todo repeat for repeated dates
    const tasks$ = this.store.pipe(select(TasksQuery.getTasks));
    tasks$.pipe(
      map(task => {
          return {
            start: new Date(task.date),
            title: task.description,
            allDay: true
          };
        }
      ));
  }
}
