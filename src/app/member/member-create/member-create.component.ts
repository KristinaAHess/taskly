import {Component, OnInit} from '@angular/core';
import {AddMemberAction} from '../../state/member/member.actions';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApplicationState} from '../../state/app.state';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-member-create',
  templateUrl: './member-create.component.html',
  styleUrls: ['./member-create.component.css']
})
export class MemberCreateComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder,
              private store: Store<ApplicationState>) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: '',
      name: '',
      nickname: '',
      birthday: '',
      sex: '',
      image: '',
      score: 0,
    });
  }

  saveNewMember($event) {
    const newMember = {...$event};
    this.store.dispatch(new AddMemberAction(newMember));
  }

}
