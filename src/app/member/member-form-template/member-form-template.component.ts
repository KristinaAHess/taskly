import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormGroup} from '@angular/forms';
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
    this.form.get('name').markAsTouched();
    this.form.get('sex').markAsTouched();
    if (this.form.valid) {
      this.member.emit(this.form.value);
    }
  }

}
