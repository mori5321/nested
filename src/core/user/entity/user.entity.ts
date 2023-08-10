import { Flavor } from '../../../utils/flavor';

type UserId = Flavor<string, 'UserId'>;
type UserName = Flavor<string, 'UserName'>;

const mkUserId = (id: string): UserId => {
  // Validate
  return id as UserId;
};

const mkUserName = (name: string): UserName => {
  // Validat
  return name as UserName;
};

export const mkUser = (id: string, name: string): User => {
  return {
    id: mkUserId(id),
    name: mkUserName(name),
  };
};

export type User = {
  id: UserId;
  name: UserName;
};
