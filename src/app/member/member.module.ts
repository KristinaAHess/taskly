import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from './member-list/member-list.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberCreateComponent } from './member-create/member-create.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { MemberFormTemplateComponent } from './member-form-template/member-form-template.component';
import { RouterModule } from '@angular/router';
import { MEMBER_ROUTES } from './member.routes';
import { MemberComponent } from './member.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MEMBER_ROUTES)
  ],
  declarations: [
    MemberListComponent,
    MemberDetailsComponent,
    MemberEditComponent,
    MemberCreateComponent,
    MemberDashboardComponent,
    MemberFormTemplateComponent,
    MemberComponent]
})
export class MemberModule {
}
