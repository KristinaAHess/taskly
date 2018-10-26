import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { Routes } from '@angular/router';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskExistsGuard } from './task-exists.guard';

export const TASK_ROUTES: Routes = [
  { path: '', component: TaskDashboardComponent,
    children: [
      { path: '', redirectTo: '0', pathMatch: 'full' },
      { path: 'create', component: TaskCreateComponent },
      {
        path: ':id',
        component: TaskDetailsComponent,
        canActivate: [TaskExistsGuard]
      },
      {
        path: ':id/edit',
        component: TaskEditComponent,
        canActivate: [TaskExistsGuard]
      },
    ]
  },

  { path: '**', redirectTo: '/' }
];
