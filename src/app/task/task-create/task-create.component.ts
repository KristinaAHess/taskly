import {Component, OnInit} from '@angular/core';
import {Member} from '../../member/models/member';
import {MembersQuery} from '../../state/member/member.reducer';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApplicationState} from '../../state/app.state';
import {select, Store} from '@ngrx/store';
import {AddTaskAction} from '../../state/task/task.actions';

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
      description: '',
      points: 0,
      date: '',
      repetitionAfterDays: 0,
      image: '',
      preferredBy: '',
    });

    this.store.pipe(select(MembersQuery.getMembers)).subscribe((members) =>  this.members = members);
  }

  saveNewTask($event) {
    const newTask = {...$event};
    this.store.dispatch(new AddTaskAction(newTask));
  }

}
