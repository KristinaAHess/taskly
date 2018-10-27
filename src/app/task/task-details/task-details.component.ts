import { DialogService } from './../../shared/mat-confirm-dialog/dialog.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ApplicationState } from 'src/app/state/app.state';
import { RemoveTaskAction } from 'src/app/state/task/task.actions';
import { TasksQuery } from 'src/app/state/task/task.reducer';
import { Task } from 'src/app/task/models/task';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  task$: Observable<Task>;

  constructor(
    private route: ActivatedRoute,
    private store: Store<ApplicationState>,
    private router: Router,
    private dialogService: DialogService) { }

  ngOnInit() {
    this.task$ = this.store.pipe(select(TasksQuery.getSelectedTask));
  }

  navigateToEditor() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDelete(task) {
    this.dialogService.openConfirmDialog('Are you sure to delete this task?')
    .afterClosed().subscribe(res => {
      if (res) {
        this.store.dispatch(new RemoveTaskAction(task));
      }
    });
  }
}
