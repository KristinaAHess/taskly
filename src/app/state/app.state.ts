import { MembersState, membersReducer } from './member/member.reducer';
import { ActionReducerMap } from '@ngrx/store';
import { tasksReducer, TasksState } from './task/task.reducer';


export interface ApplicationState {
  members: MembersState;
  tasks: TasksState;
}


// this maps the slices of the state to the reducers that takes care of it
export const ROOT_REDUCER: ActionReducerMap<ApplicationState> = {
  // this means, that the contactsReducer takes care of the contacts property in our ApplicationState
  members: membersReducer,
  tasks: tasksReducer
};
