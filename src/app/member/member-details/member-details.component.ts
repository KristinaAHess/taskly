import { LoadMembersAction, SelectMemberAction } from './../../state/member/member.actions';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationState } from 'src/app/state/app.state';
import { Store, select } from '@ngrx/store';
import { MembersQuery } from 'src/app/state/member/member.reducer';
import { Member } from '../models/member';
import { Observable } from 'rxjs';
import { TasksQuery } from '../../state/task/task.reducer';
import { CalendarEvent } from 'angular-calendar';
import { LoadTasksAction } from '../../state/task/task.actions';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  events$: Observable<Array<CalendarEvent>>;
  member$: Observable<Member>;

  constructor(private route: ActivatedRoute, private store: Store<ApplicationState>, private router: Router) {
  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new LoadMembersAction());
    this.store.dispatch(new SelectMemberAction(+id));
    this.store.dispatch(new LoadTasksAction());
    this.member$ = this.store.pipe(select(MembersQuery.getSelectedMember));
    this.events$ = this.store.pipe(select(TasksQuery.getEventsforSelectedMember));
  }

  navigateToEditor() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
