import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberCreateComponent } from './member-create/member-create.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { Routes } from '@angular/router';
import { MemberExistsGuard } from './member-exists.guard';
import { EventExistsGuard } from '../task/event-exists.guard';
// import { MembersExistGuard } from './members-exist.guard';

export const MEMBER_ROUTES: Routes = [
  { path: '', component: MemberDashboardComponent,
    // canActivate: [MembersExistGuard],
    children: [
      { path: '', redirectTo: '0', pathMatch: 'full' },
      { path: 'create', component: MemberCreateComponent },
      {
        path: ':id',
        component: MemberDetailsComponent,
        canActivate: [MemberExistsGuard, EventExistsGuard]
      },
      {
        path: ':id/edit',
        component: MemberEditComponent,
        canActivate: [MemberExistsGuard]
      },
    ]
  },

  { path: '**', redirectTo: '/' }
];
