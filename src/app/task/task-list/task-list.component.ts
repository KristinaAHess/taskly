import { Component, Input, OnInit } from '@angular/core';
import { Task } from '../models/task';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input()
  tasks: Array<Task>;

  constructor() {
  }

  ngOnInit() {
  }

  trackByTaskId(index, task) {
    return task.id;
  }
}
