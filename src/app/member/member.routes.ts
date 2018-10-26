import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { Routes } from '@angular/router';

export const MEMBER_ROUTES: Routes = [
  { path: '', component: MemberDashboardComponent },

  // Wildcard route serves as fallback route and has to be
  // the last defined route in this list.
  { path: '**', redirectTo: '/' }
];
