import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Member, Sex} from '../models/member';

@Component({
  selector: 'app-member-form-template',
  templateUrl: './member-form-template.component.html',
  styleUrls: ['./member-form-template.component.css']
})
export class MemberFormTemplateComponent implements OnInit {

  @Input() form: FormGroup;
  @Output() member = new EventEmitter<Member>();
  sexEnum = Sex;

  constructor() { }

  ngOnInit() {
  }

  saveMember() {
    this.member.emit(this.form.value);
  }

}
