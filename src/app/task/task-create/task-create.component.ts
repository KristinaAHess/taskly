import {Component, OnInit} from '@angular/core';
import {Member} from '../../member/models/member';
import {MembersQuery} from '../../state/member/member.reducer';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApplicationState} from '../../state/app.state';
import {select, Store} from '@ngrx/store';
import { AddTaskAction, CalculateEventsAction } from '../../state/task/task.actions';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  form: FormGroup;
  members: Member[];

  constructor(private fb: FormBuilder,
              private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: '',
      description: ['', Validators.required],
      points: [1, [Validators.min(1), Validators.max(5)]],
      date: ['', Validators.required],
      repetitionAfterDays: [0, [Validators.min(0), Validators.max(365)]],
      icon: '/assets/icons/cleaning.png',
      preferredBy: '',
    });

    this.store.pipe(select(MembersQuery.getMembers)).subscribe((members) =>  this.members = members);
  }

  saveNewTask($event) {
    const newTask = {...$event};
    this.store.dispatch(new AddTaskAction(newTask));
    this.store.dispatch(new CalculateEventsAction());
  }

}
