import { CalculateEventsAction } from './../state/task/task.actions';
import { TasksQuery } from 'src/app/state/task/task.reducer';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { ApplicationState } from '../state/app.state';
import { map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class EventsExistsGuard implements CanActivate {
  constructor(private store: Store<ApplicationState>, private eventService: EventService) {
  }

  canActivate(route: ActivatedRouteSnapshot) {
// todo calculate Tasks whenever something changes in the tasks!

    return this.store.pipe(
      select(TasksQuery.getEventsLoaded),
      take(1),
      switchMap(loaded => {
        if (!loaded) {
          this.store.dispatch(new CalculateEventsAction());
        }
        return of(true);
      })
    );
  }
}
