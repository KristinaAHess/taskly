import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Task} from '../models/task';
import {Member} from '../../member/models/member';

@Component({
  selector: 'app-task-form-template',
  templateUrl: './task-form-template.component.html',
  styleUrls: ['./task-form-template.component.css']
})
export class TaskFormTemplateComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() members: Member[];
  @Output() task = new EventEmitter<Task>();

  constructor() { }

  ngOnInit() {
  }

  saveTask() {
    this.task.emit(this.form.value);
  }

}
