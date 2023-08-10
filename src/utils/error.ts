import { Flavor } from './flavor';

export type IError<K extends string> = Flavor<
  {
    message: string;
  },
  K
>;
