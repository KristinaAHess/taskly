import {Member} from '../../member/models/member';

export interface Task {
  id: number;
  description: string;
  points: number;
  date: string;
  repetitionAfterDays?: number;
  icon?: string;
  preferredBy?: number;
  doneBy?: Member;
}

