import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { of } from 'rxjs';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { LoadMembersAction } from 'src/app/state/member/member.actions';
import { MembersQuery } from 'src/app/state/member/member.reducer';

import { ApplicationState } from '../state/app.state';
import { MemberService } from './member.service';
/*
@Injectable({
  providedIn: 'root'
})
export class MembersExistGuard implements CanActivate {
  constructor(private store: Store<ApplicationState>, private memberService: MemberService) {}

  canActivate() {
    return this.store.pipe(
      select(MembersQuery.getMembersLoaded),
      take(1),
      switchMap(loaded => {
        return loaded ? of(true) : (() => {
          this.store.dispatch(new LoadMembersAction());
          return of(true);
        });
      })
    );
  }
}
*/
