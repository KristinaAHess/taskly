import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from '../state/app.state';
import { TasksQuery } from '../state/task/task.reducer';
import { flatMap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import { Task } from './models/task';
import { MembersQuery } from '../state/member/member.reducer';

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
      flatMap(tasks =>
        this.store.pipe(select(MembersQuery.getMemberEntities),
          map(entites => {
            const events: Array<CalendarEvent> = new Array();
            for (const task of tasks) {
              if (task.doneBy) {
                const member = entites[task.doneBy.id];
                if (member) {
                  events.push(<CalendarEvent> {
                    start: new Date(task.date),
                    title: task.description,
                    allDay: true,
                    color: {
                      primary: member.color,
                      secondary: member.color
                    }
                  });
                }
              }
            }
            console.log(events);
            return events;
          }))
      ));
  }
}
