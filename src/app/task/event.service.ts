import { AddTaskAction } from './../state/task/task.actions';
import { Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from '../state/app.state';
import { TasksQuery } from '../state/task/task.reducer';
import { flatMap, map, tap, switchMap, filter, concatMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import { Task } from './models/task';
import { MembersQuery } from '../state/member/member.reducer';
import { pipe } from '@angular/core/src/render3/pipe';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private store: Store<ApplicationState>) {
  }

  calculateEvents(): Observable<Array<CalendarEvent>> {
    // todo repeat for repeated dates
    const tasks$: Observable<Array<Task>> = this.createTaskRepititions(this.store.pipe(select(TasksQuery.getTasks)));

    return tasks$.pipe(
      flatMap(tasks =>
        this.store.pipe(select(MembersQuery.getMemberEntities),
          map(entites => {
            const events: Array<CalendarEvent> = new Array();
            for (const task of tasks) {
              const member = entites[task.preferredBy];
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
            // console.log('events', events);
            return events;
          }))
      ));
  }

  private createTaskRepititions(tasks$: Observable<Array<Task>>): Observable<Array<Task>> {
    return tasks$.pipe(
      concatMap(tasks => tasks),
      tap(console.log),
      filter(task => (this.taskIsInThisWeek(task) && !!task.repetitionAfterDays)),
      tap((task) => {
        const newDate = this.calculateNextDate(task);
        console.log('new task', { ...task, date: newDate});
        this.store.dispatch(new AddTaskAction({ ...task, id: task.id + 20, date: newDate}));
      }),
      map(task => {
        return { ...task, repetitionAfterDays: undefined };
      }),
      tap(task => console.log('finished:', task))
    );
  }

  private taskIsInThisWeek(task: Task): boolean {
    const today = new Date();
    const taskDate = new Date(task.date);
    if (taskDate.getMonth() === today.getMonth()) {
      return ((new Date(task.date).getDate() - today.getDate()) <= 7);
    } else if (taskDate.getMonth() > (today.getMonth() + 1)) {
      return false;
    } else {
      return ((this.getMaxMonthDays(today.getMonth()) - today.getDay()) + taskDate.getDay()) <= 7;
    }
  }

  private getMaxMonthDays(month: number): number {
    switch (month) {
      case 1: case 3: case 5: case 7: case 8: case 10: case 12:
        return 31;
      case 2:
        return 28;
      case 4: case 6: case 9: case 11:
        return 30;
    }
  }

  private calculateNextDate(task: Task): string {
    const taskDate = new Date(task.date);
    if (taskDate.getDate() + task.repetitionAfterDays <= this.getMaxMonthDays(taskDate.getMonth() + 1)) {
      return `${taskDate.getFullYear()}-${taskDate.getMonth() + 1}-${taskDate.getDate() + task.repetitionAfterDays}`;
    } else {
      // tslint:disable-next-line:max-line-length
      return `${taskDate.getFullYear()}-${taskDate.getMonth() + 2}-${task.repetitionAfterDays - (this.getMaxMonthDays(taskDate.getMonth()) - taskDate.getDate())}`;
    }
  }
}
