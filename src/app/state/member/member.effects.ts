import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { concatMap, map, switchMap, tap } from 'rxjs/operators';
import { Member } from 'src/app/member/models/member';

import { MemberService } from './../../member/member.service';
import {
  AddMemberSuccessAction,
  LoadMembersSuccessAction,
  MemberActionTypes,
  RemoveMemberAction,
  RemoveMemberSuccessAction,
  UpdateMemberAction,
  UpdateMemberSuccessAction,
} from './member.actions';

@Injectable({
  providedIn: 'root'
})
export class MemberEffects {
  constructor(private actions$: Actions, private membersService: MemberService, private router: Router) {}

  @Effect() getMembers$ = this.actions$.pipe(
    ofType(MemberActionTypes.LOAD_MEMBERS),
    switchMap(payload => this.membersService.getMembers()),
    tap(console.log),
    map((members: Array<Member>) => new LoadMembersSuccessAction(members))
  );

  @Effect() updateMember$ = this.actions$.pipe(
    ofType(MemberActionTypes.UPDATE_MEMBER),
    map((action: UpdateMemberAction) => action.payload),
    concatMap((member: Member) => this.membersService.updateMember(member)),
    // tap((member: Member) => this.router.navigate(['/members', member.id])),
    map((member: Member) => new UpdateMemberSuccessAction(member))
  );

  @Effect() addMember$ = this.actions$.pipe(
    ofType(MemberActionTypes.ADD_MEMBER),
    map((action: UpdateMemberAction) => action.payload),
    concatMap((member: Member) => this.membersService.updateMember(member)),
    // tap((member: Member) => this.router.navigate(['/members', member.id])),
    map((member: Member) => new AddMemberSuccessAction(member))
  );

  /*
  @Effect() removeMember$ = this.actions$.pipe(
    ofType(MemberActionTypes.REMOVE_MEMBER),
    map((action: RemoveMemberAction) => action.payload),
    concatMap((mameber: Member) => this.membersService.removeMember(member)),
    map((member: Member) => new RemoveMemberSuccessAction(member))
  );
  */
}
