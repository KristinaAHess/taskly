import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { Routes } from '@angular/router';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { TaskCreateComponent } from './task-create/task-create.component';

export const TASK_ROUTES: Routes = [
  { path: '', component: TaskDashboardComponent },
  { path: 'create', component: TaskCreateComponent },
  { path: ':id', component: TaskDetailsComponent },
  { path: ':id/edit', component: TaskEditComponent },

  { path: '**', redirectTo: '/' }
];
