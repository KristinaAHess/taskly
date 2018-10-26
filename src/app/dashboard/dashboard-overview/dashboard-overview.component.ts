import { Component, OnInit } from '@angular/core';
import { ApplicationState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { LoadMembersAction } from 'src/app/state/member/member.actions';

@Component({
  selector: 'app-dashboard-overview',
  templateUrl: './dashboard-overview.component.html',
  styleUrls: ['./dashboard-overview.component.css']
})
export class DashboardOverviewComponent implements OnInit {

  constructor(private store: Store<ApplicationState>) { }

  ngOnInit() {
  }

}
