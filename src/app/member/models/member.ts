export interface Member {
  id: number;
  name: string;
  nickname?: string;
  birthday?: string;
  score: number;
  sex: Sex;
  image?: string;
  color: string;
}

export enum Sex {
  FEMALE = 'female',
  MALE = 'male',
}
