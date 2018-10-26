import { TasksState } from "./task/task.reducer";
import { MembersState } from "./member/member.reducer";

export interface ApplicationState {
  members: MembersState;
  tasks: TasksState;
}
