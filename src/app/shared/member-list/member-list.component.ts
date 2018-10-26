import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../../member/models/member';
import { MemberService } from '../../member/member.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members$: Observable<Array<Member>>;

  constructor(private memberService: MemberService) {
  }

  ngOnInit() {
    this.members$ = this.memberService.getMembers();
  }

  trackByMemberId(index, member) {
    return member.id;
  }

}
