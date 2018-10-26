import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApplicationState} from '../../state/app.state';
import {select, Store} from '@ngrx/store';
import {MembersQuery} from '../../state/member/member.reducer';
import {TasksQuery} from '../../state/task/task.reducer';
import {UpdateTaskAction} from '../../state/task/task.actions';
import {Member} from '../../member/models/member';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {

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

    this.store.pipe(select(TasksQuery.getSelectedTask)).subscribe((task) => {
      this.form.patchValue(task);
    });
    this.store.pipe(select(MembersQuery.getMembers)).subscribe((members) =>  this.members = members);
  }

  saveTask($event) {
    const updatedTask = {...$event};
    this.store.dispatch(new UpdateTaskAction(updatedTask));
  }

}
