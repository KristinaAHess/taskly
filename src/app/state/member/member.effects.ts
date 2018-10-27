import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { concatMap, filter, map, switchMap, tap } from 'rxjs/operators';
import { Member } from 'src/app/member/models/member';
import { LoadMemberByIdAction } from 'src/app/state/member/member.actions';
import { MembersQuery } from 'src/app/state/member/member.reducer';

import { ApplicationState } from '../app.state';
import { MemberService } from './../../member/member.service';
import {
  AddMemberSuccessAction,
  LoadMemberByIdSuccessAction,
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
  constructor(
    private actions$: Actions,
    private membersService: MemberService,
    private router: Router,
    private store: Store<ApplicationState>) {}

  @Effect() getMembers$ = this.actions$.pipe(
    ofType(MemberActionTypes.LOAD_MEMBERS),
    this.filterIfLoaded(MembersQuery.getMembersLoaded),
    switchMap(payload => this.membersService.getMembers()),
    map((members: Array<Member>) => new LoadMembersSuccessAction(members))
  );

  @Effect() getMemberById$ = this.actions$.pipe(
    ofType(MemberActionTypes.LOAD_MEMBER_BY_ID),
    map((action: LoadMemberByIdAction) => action.payload),
    this.filterIfLoaded(MembersQuery.getMembersLoaded),
    switchMap(payload => this.membersService.getMember(String(payload))),
    map((member: Member) => new LoadMemberByIdSuccessAction(member))
  );

  @Effect() updateMember$ = this.actions$.pipe(
    ofType(MemberActionTypes.UPDATE_MEMBER),
    map((action: UpdateMemberAction) => action.payload),
    concatMap((member: Member) => this.membersService.updateMember(member)),
    tap((member: Member) => this.router.navigate(['/members', member.id])),
    map((member: Member) => new UpdateMemberSuccessAction(member))
  );

  @Effect() addMember$ = this.actions$.pipe(
    ofType(MemberActionTypes.ADD_MEMBER),
    map((action: UpdateMemberAction) => action.payload),
    concatMap((member: Member) => this.membersService.addMember(member)),
    tap((member: Member) => this.router.navigate(['/members', member.id])),
    map((member: Member) => new AddMemberSuccessAction(member))
  );

  @Effect() removeMember$ = this.actions$.pipe(
    ofType(MemberActionTypes.REMOVE_MEMBER),
    map((action: RemoveMemberAction) => action.payload),
    concatMap((member: Member) => this.membersService.removeMember(String(member.id))),
    map((memberId: string) => new RemoveMemberSuccessAction(memberId))
  );


  private filterIfLoaded(fn) {
    return source => source.pipe(
      switchMap(payload => this.store.pipe(
          select(fn),
          map(loaded => {
            return {loaded, payload};
          })
        )
      ),
      filter((res: {loaded: boolean, payload: any}) => !res.loaded),
      map((res: {loaded: boolean, payload: any}) => res.payload)
    );
  }
}
