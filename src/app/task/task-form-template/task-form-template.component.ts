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

  onSelectFile($event) {
    if ($event.target.files && $event.target.files[0]) {
      const reader = new FileReader();

      reader.readAsDataURL($event.target.files[0]); // read file as data url

      reader.onload = (event) => { // called once readAsDataURL is completed
        this.form.patchValue({icon: event.target.result});
      };
    }
  }

  saveTask() {
    this.form.get('description').markAsTouched();
    this.form.get('date').markAsTouched();
    this.form.get('points').markAsTouched();
    this.form.get('repetitionAfterDays').markAsTouched();
    if (this.form.valid) {
      this.task.emit(this.form.value);
    }
  }

}
