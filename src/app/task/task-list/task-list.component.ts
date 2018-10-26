import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task';
import { TaskService } from '../task.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {

  tasks$: Observable<Array<Task>>;

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.tasks$ = this.taskService.getTasks().pipe(tap(console.log));
  }

  trackByTaskId(index, task) {
    return task.id;
  }
}
