import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { MaterialModule } from '../material.module';
import { SharedModule } from '../shared/shared.module';
import { MemberEffects } from '../state/member/member.effects';
import { membersReducer } from '../state/member/member.reducer';
import { MemberCreateComponent } from './member-create/member-create.component';
import { MemberDashboardComponent } from './member-dashboard/member-dashboard.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberExistsGuard } from './member-exists.guard';
import { MemberFormTemplateComponent } from './member-form-template/member-form-template.component';
import { MemberComponent } from './member.component';
import { MEMBER_ROUTES } from './member.routes';
import { MemberService } from './member.service';
import {ReactiveFormsModule} from '@angular/forms';
import { ImageUploadModule } from 'angular2-image-upload';

@NgModule({
  imports: [
    CommonModule,
    EffectsModule.forFeature([MemberEffects]),
    StoreModule.forFeature('members', membersReducer),
    RouterModule.forChild(MEMBER_ROUTES),
    MaterialModule,
    ImageUploadModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  declarations: [
    MemberDetailsComponent,
    MemberEditComponent,
    MemberCreateComponent,
    MemberDashboardComponent,
    MemberFormTemplateComponent,
    MemberComponent
  ],
  providers: [
    MemberService,
    MemberExistsGuard,
  ]
})
export class MemberModule {
}
