import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberCreateComponent } from './member-create/member-create.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { Routes } from '@angular/router';

export const MEMBER_ROUTES: Routes = [
  { path: '', component: MemberDashboardComponent,
    children: [
      { path: '', redirectTo: '0', pathMatch: 'full' },
      { path: 'create', component: MemberCreateComponent },
      {
        path: ':id',
        component: MemberDetailsComponent,
        // canActivate: [MemberExistsGuard]
      },
      {
        path: ':id/edit',
        component: MemberEditComponent,
        // canActivate: [MemberExistsGuard]
      },
    ]
  },

  { path: '**', redirectTo: '/' }
];
