
import { Routes } from '@angular/router';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';

export const APP_ROUTES: Routes = [
  { path: '', component: DashboardOverviewComponent },
  { path: 'tasks', loadChildren: './task/task.module#TaskModule' },
  { path: 'members', loadChildren: './member/member.module#MemberModule' },

  // Wildcard route serves as fallback route and has to be
  // the last defined route in this list.
  { path: '**', redirectTo: '/' }
];
