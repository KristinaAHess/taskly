import { LoadMembersAction } from './../../state/member/member.actions';
import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationState } from 'src/app/state/app.state';

import { Member } from '../models/member';
import { MembersQuery } from './../../state/member/member.reducer';

@Component({
  selector: 'app-member-dashboard',
  templateUrl: './member-dashboard.component.html',
  styleUrls: ['./member-dashboard.component.css']
})
export class MemberDashboardComponent implements OnInit {

  members$: Observable<Array<Member>>;

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.store.dispatch(new LoadMembersAction());
    this.members$ = this.store.pipe(select(MembersQuery.getMembers));
  }

}
