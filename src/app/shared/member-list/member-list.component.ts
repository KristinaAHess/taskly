import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../../member/models/member';
import { LoadMembersAction, SelectMemberAction } from '../../state/member/member.actions';
import { select, Store } from '@ngrx/store';
import { MembersQuery } from '../../state/member/member.reducer';
import { ApplicationState } from '../../state/app.state';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members$: Observable<Array<Member>>;

  constructor(private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.store.dispatch(new LoadMembersAction());
    this.members$ = this.store.pipe(select(MembersQuery.getMembers));
  }

  trackByMemberId(index, member) {
    return member.id;
  }

}
