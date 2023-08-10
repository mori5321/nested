import { validation, lift } from '../../../utils/validation';
import { Either } from 'fp-ts/lib/Either';
import { InvalidUserIdError, InvalidUserNameError } from './user.error';
import { mkUserId, UserId } from './userId';
import { mkUserName, UserName } from './userName';

export type User = {
  id: UserId;
  name: UserName;
};

type UserError = InvalidUserIdError | InvalidUserNameError;

export const mkUser = (id: string, name: string): Either<UserError[], User> => {
  return validation<UserError>()({
    id: lift(mkUserId(id)),
    name: lift(mkUserName(name)),
  });
};
