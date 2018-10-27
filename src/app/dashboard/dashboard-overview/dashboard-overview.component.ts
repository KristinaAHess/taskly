import { Component, OnInit } from '@angular/core';
import { ApplicationState } from 'src/app/state/app.state';
import { select, Store } from '@ngrx/store';
import { TasksQuery } from '../../state/task/task.reducer';
import { Observable } from 'rxjs';
import { CalendarEvent } from 'angular-calendar';
import { LoadMembersAction } from '../../state/member/member.actions';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent implements OnInit {
  events$: Observable<Array<CalendarEvent>>;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.events$ = this.store.pipe(select(TasksQuery.getEvents));
    this.store.dispatch(new LoadMembersAction());
  }

}
