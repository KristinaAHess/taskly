import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MemberListComponent } from '../shared/member-list/member-list.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberCreateComponent } from './member-create/member-create.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { MemberFormTemplateComponent } from './member-form-template/member-form-template.component';
import { MemberService } from './member.service';
import { RouterModule } from '@angular/router';
import { MEMBER_ROUTES } from './member.routes';
import { MemberComponent } from './member.component';
import { MaterialModule } from '../material.module';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(MEMBER_ROUTES),
    MaterialModule,
    HttpClientModule,
    SharedModule
  ],
  declarations: [
    MemberDetailsComponent,
    MemberEditComponent,
    MemberCreateComponent,
    MemberDashboardComponent,
    MemberFormTemplateComponent,
    MemberFormTemplateComponent,
    MemberComponent
  ],
  providers: [
    MemberService
  ]
})
export class MemberModule {
}
