export interface Task {
  id: number;
  description: string;
  points: number;
  date: string;
  repetitionAfterDays?: number;
  icon?: string;
  preferredBy?: Array<number>;
}

