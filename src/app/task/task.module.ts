import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { tasksReducer } from '../state/task/task.reducer';
import { TaskEffects } from './../state/task/task.effects';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { TaskDetailsComponent } from './task-details/task-details.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskFormTemplateComponent } from './task-form-template/task-form-template.component';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskComponent } from './task.component';
import { TASK_ROUTES } from './task.routes';
import { TaskService } from './task.service';
import { MaterialModule } from '../material.module';
import { TaskExistsGuard } from './task-exists.guard';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([TaskEffects]),
    StoreModule.forFeature('tasks', tasksReducer),
    RouterModule.forChild(TASK_ROUTES),
    MaterialModule,
    SharedModule
  ],
  declarations: [
    TaskDashboardComponent,
    TaskListComponent,
    TaskDetailsComponent,
    TaskEditComponent,
    TaskCreateComponent,
    TaskFormTemplateComponent,
    TaskComponent
  ],
  providers: [
    TaskService,
    TaskExistsGuard
  ]
})
export class TaskModule {
}
