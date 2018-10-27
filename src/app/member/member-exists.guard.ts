import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { filter, mapTo } from 'rxjs/operators';
import { LoadMemberByIdAction } from 'src/app/state/member/member.actions';
import { MembersQuery } from 'src/app/state/member/member.reducer';

import { ApplicationState } from '../state/app.state';
import { SelectMemberAction } from '../state/member/member.actions';
import { MemberService } from './member.service';

@Injectable({
  providedIn: 'root'
})
export class MemberExistsGuard implements CanActivate {
  constructor(private store: Store<ApplicationState>) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const memberId = route.paramMap.get('id');
    this.store.dispatch(new SelectMemberAction(+memberId));
    this.store.dispatch(new LoadMemberByIdAction(+memberId));

    return this.store.pipe(
      // select the selected member from the store (will be undefined some times!)
      select(MembersQuery.getSelectedMember),
      // only let it pass, if the member is not undefined
      filter(member => !!member),
      // as soon as a defined member passes the pipeline, return true (routing happens)
      mapTo(true),
    );
  }
}
