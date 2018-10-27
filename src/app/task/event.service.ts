import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from '../state/app.state';
import { TasksQuery } from '../state/task/task.reducer';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import { Task } from './models/task';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private store: Store<ApplicationState>) {
  }

  calculateEvents(): Observable<Array<CalendarEvent>> {
    // todo repeat for repeated dates
    const tasks$: Observable<Array<Task>> = this.store.pipe(select(TasksQuery.getTasks));
    return tasks$.pipe(
      map(tasks => {
          const events: Array<CalendarEvent> = new Array();
          for (const task of tasks) {
            events.push({
              start: new Date(task.date),
              title: task.description,
              allDay: true,
              // todo color: task.preferredBy[0].color
            });
          }
          return events;
        }
      ));
  }
}
