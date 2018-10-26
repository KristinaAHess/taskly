import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Member, Sex} from '../models/member';
import {ApplicationState} from '../../state/app.state';
import {select, Store} from '@ngrx/store';
import {SelectMemberAction, UpdateMemberAction} from '../../state/member/member.actions';
import {MembersQuery} from '../../state/member/member.reducer';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

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
      score: '',
    });
    this.store.pipe(select(MembersQuery.getSelectedMember)).subscribe((member) => {
      this.form.patchValue(member);
    });
  }

  saveMember($event) {
    const updatedMember = {...$event};
    this.store.dispatch(new UpdateMemberAction(updatedMember));
  }
}
