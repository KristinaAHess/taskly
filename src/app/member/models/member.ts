export interface Member {
  id: number;
  name: string;
  nickname?: string;
  birthday?: string;
  score: number;
  sex: Sex;
}

export enum Sex {
  female,
  male,
}
