import { MemberActionTypes, MembersActions } from './member.actions';
import { Member } from 'src/app/member/models/member';
import { ApplicationState } from '../app.state';
import { createSelector } from '@ngrx/store';

export interface MembersState {
  entities: { [id: number]: Member };
  selectedMemberId: number;
  loaded: boolean;
}

const INITIAL_MEMBERS_STATE = {
  entities: {},
  selectedMemberId: -1,
  loaded: false
};

export function membersReducer(state: MembersState = INITIAL_MEMBERS_STATE, action: MembersActions): MembersState {
  switch (action.type) {
    case MemberActionTypes.LOAD_MEMBERS_SUCCESS:
      return {
        ...state,
        entities: action.payload.reduce(
          (memberEntities, member) => {
            return { ...memberEntities, [member.id]: member };
          },
          { ...state.entities }
        ),
        loaded: true
      };
    case MemberActionTypes.ADD_MEMBER_SUCCESS:
      const inStore = state.entities[action.payload.id];

      return {
        ...state,
        entities: !inStore
          ? { ...state.entities, [action.payload.id]: action.payload }
          : state.entities
      };
    case MemberActionTypes.SELECT_MEMBER:
      return { ...state, selectedMemberId: action.payload };
    case MemberActionTypes.REMOVE_MEMBER_SUCCESS:
      const { [action.payload.id]: removedMember, ...entities } = state.entities;

      return {
        ...state,
        entities
      };
      break;
    case MemberActionTypes.UPDATE_MEMBER_SUCCESS:
      return { ...state, entities: { ...state.entities, [action.payload.id]: action.payload }};
    default:
      return state;
  }
}

export namespace MembersQuery {
  export const getMemberEntities = (state: ApplicationState) => state.members.entities;
  export const getSelectedMemberId = (state: ApplicationState) => state.members.selectedMemberId;
  export const getMembersLoaded = (state: ApplicationState) => state.members.loaded;

  export const getMembers = createSelector(getMemberEntities, entities => {
    return Object.keys(entities).map(id => entities[id]);
  });

  export const getSelectedMember = createSelector(getMemberEntities, getSelectedMemberId, (members, id) => {
    return members[id];
  });
}
