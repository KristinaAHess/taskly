import { AddMemberAction } from './../state/member/member.actions';
import { Member } from './models/member';
import { MembersQuery } from 'src/app/state/member/member.reducer';
import { MemberService } from './member.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { ApplicationState } from '../state/app.state';
import { SelectMemberAction } from '../state/member/member.actions';
import { take, switchMap, tap, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MemberExistsGuard implements CanActivate {
  constructor(private store: Store<ApplicationState>, private memberService: MemberService) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const memberId = route.paramMap.get('id');
    this.store.dispatch(new SelectMemberAction(+memberId));

    return this.store.pipe(
      select(MembersQuery.getMembersLoaded),
      take(1),
      switchMap(loaded => {
        const addMemberToList = (member: Member) => this.store.dispatch(new AddMemberAction(member));
        return loaded ? of(true) : this.memberService.getMember(memberId).pipe(
            tap(addMemberToList),
            map(member => !!member)
          );
      })
    );
  }
}
