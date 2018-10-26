import { Routes } from '@angular/router';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';

export const TASK_ROUTES: Routes = [
  { path: '', component: TaskDashboardComponent },

  { path: '**', redirectTo: '/' }
];
