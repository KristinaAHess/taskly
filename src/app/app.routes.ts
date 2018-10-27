import { Routes } from '@angular/router';
import { DashboardOverviewComponent } from './dashboard/dashboard-overview/dashboard-overview.component';
import { EventsExistsGuard } from './task/events-exists-guard.service';

export const APP_ROUTES: Routes = [
  {path: '', component: DashboardOverviewComponent, canActivate: [EventsExistsGuard]},
  {path: 'members', loadChildren: './member/member.module#MemberModule'},
  {path: 'tasks', loadChildren: './task/task.module#TaskModule'},

  // Wildcard route serves as fallback route and has to be
  // the last defined route in this list.
  {path: '**', redirectTo: '/'}
];
