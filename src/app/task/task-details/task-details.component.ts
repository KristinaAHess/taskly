import {Task} from 'src/app/task/models/task';
import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from 'src/app/state/app.state';
import {TasksQuery} from 'src/app/state/task/task.reducer';
import { RemoveTaskAction } from 'src/app/state/task/task.actions';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent implements OnInit {

  task$: Observable<Task>;

  constructor(private route: ActivatedRoute, private store: Store<ApplicationState>, private router: Router) { }

  ngOnInit() {
    this.task$ = this.store.pipe(select(TasksQuery.getSelectedTask));
  }

  navigateToEditor() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  removeTask(task: Task) {
    this.store.dispatch(new RemoveTaskAction(task));
  }
}
