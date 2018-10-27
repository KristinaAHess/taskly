import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApplicationState } from '../../state/app.state';
import { select, Store } from '@ngrx/store';
import { MembersQuery } from '../../state/member/member.reducer';
import { TasksQuery } from '../../state/task/task.reducer';
import { UpdateTaskAction } from '../../state/task/task.actions';
import { Member } from '../../member/models/member';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

  form: FormGroup;
  members: Member[];

  constructor(private fb: FormBuilder,
              private store: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: '',
      description: ['', Validators.required],
      points: [1, [Validators.min(1), Validators.max(5)]],
      date: ['', Validators.required],
      repetitionAfterDays: [0, [Validators.min(0), Validators.max(365)]],
      icon: '/assets/icons/cleaning.png',
      preferredBy: ''
    });

    this.store.pipe(select(TasksQuery.getSelectedTask)).subscribe((task) => {
      this.form.patchValue(task);
    });
    this.store.pipe(select(MembersQuery.getMembers)).subscribe((members) => this.members = members);
  }

  saveTask($event) {
    const updatedTask = {...$event};
    this.store.dispatch(new UpdateTaskAction(updatedTask));
  }

}
