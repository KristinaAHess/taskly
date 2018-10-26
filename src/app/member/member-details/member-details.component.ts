import { LoadMembersAction, SelectMemberAction } from './../../state/member/member.actions';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationState } from 'src/app/state/app.state';
import { Store, select } from '@ngrx/store';
import { MembersQuery } from 'src/app/state/member/member.reducer';
import { Member } from '../models/member';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {

  member$: Observable<Member>;

  constructor(private route: ActivatedRoute, private store: Store<ApplicationState>, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.store.dispatch(new LoadMembersAction());
    this.store.dispatch(new SelectMemberAction(+id));
    this.member$ = this.store.pipe(select(MembersQuery.getSelectedMember));
  }

  navigateToEditor() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

}
