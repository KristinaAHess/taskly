import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberCreateComponent } from './member-create/member-create.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { MemberFormTemplateComponent } from './member-form-template/member-form-template.component';
import { MemberService } from './member.service';
import { MaterialModule } from '../material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule
  ],
  declarations: [
    MemberListComponent,
    MemberDetailsComponent,
    MemberEditComponent,
    MemberCreateComponent,
    MemberDashboardComponent,
    MemberFormTemplateComponent
  ],
  providers: [
    MemberService
  ]
})
export class MemberModule {
}
