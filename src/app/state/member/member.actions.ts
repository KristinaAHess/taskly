import { Member } from 'src/app/member/models/member';
import { Action } from '@ngrx/store';

export enum MemberActionTypes {
  LOAD_MEMBERS = '[Members] Load Members',
  LOAD_MEMBERS_SUCCESS = '[Members] Load Members Success',
  LOAD_MEMBER_BY_ID = '[Members] Load Member by id',
  LOAD_MEMBER_BY_ID_SUCCESS = '[Members] Load Member by id success',
  ADD_MEMBER = '[Members] Add member',
  ADD_MEMBER_SUCCESS = '[Members] Add member success',
  REMOVE_MEMBER = '[Members] Remove member',
  REMOVE_MEMBER_SUCCESS = '[Members] Remove member success',
  UPDATE_MEMBER = '[Members] Update member',
  UPDATE_MEMBER_SUCCESS = '[Members] Update member success',
  SELECT_MEMBER = '[Members] Select member'
}

export class LoadMembersAction implements Action {
  readonly type = MemberActionTypes.LOAD_MEMBERS;
}

export class LoadMembersSuccessAction implements Action {
  readonly type = MemberActionTypes.LOAD_MEMBERS_SUCCESS;

  constructor(public payload: Array<Member>) {}
}

export class LoadMemberByIdAction implements Action {
  readonly type = MemberActionTypes.LOAD_MEMBER_BY_ID;

  constructor(public payload: number) {}
}

export class LoadMemberByIdSuccessAction implements Action {
  readonly type = MemberActionTypes.LOAD_MEMBER_BY_ID_SUCCESS;

  constructor(public payload: Member) {}
}

export class AddMemberAction implements Action {
  readonly type = MemberActionTypes.ADD_MEMBER;

  constructor(public payload: Member) {}
}

export class AddMemberSuccessAction implements Action {
  readonly type = MemberActionTypes.ADD_MEMBER_SUCCESS;

  constructor(public payload: Member) {}
}

export class RemoveMemberAction implements Action {
  readonly type = MemberActionTypes.REMOVE_MEMBER;

  constructor(public payload: Member) {}
}

export class RemoveMemberSuccessAction implements Action {
  readonly type = MemberActionTypes.REMOVE_MEMBER_SUCCESS;

  constructor(public payload: Member) {}
}

export class UpdateMemberAction implements Action {
  readonly type = MemberActionTypes.UPDATE_MEMBER;

  constructor(public payload: Member) {}
}

export class UpdateMemberSuccessAction implements Action {
  readonly type = MemberActionTypes.UPDATE_MEMBER_SUCCESS;

  constructor(public payload: Member) {}
}

export class SelectMemberAction implements Action {
  readonly type = MemberActionTypes.SELECT_MEMBER;

  constructor(public payload: number) {}
}

export type MembersActions =
  | LoadMembersAction
  | LoadMembersSuccessAction
  | LoadMemberByIdAction
  | LoadMemberByIdSuccessAction
  | AddMemberAction
  | AddMemberSuccessAction
  | RemoveMemberAction
  | RemoveMemberSuccessAction
  | UpdateMemberAction
  | UpdateMemberSuccessAction
  | SelectMemberAction;
