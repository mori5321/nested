import { Flavor } from '../../../utils/flavor';
import { InvalidUserNameError } from './user.error';
import { Either, left, right } from 'fp-ts/lib/Either';

export type UserName = Flavor<string, 'UserName'>;

export const mkUserName = (
  name: string,
): Either<InvalidUserNameError, UserName> => {
  if (name.length > 16) {
    const err = InvalidUserNameError.new(
      `User name must be less than 16 characters`,
    );
    return left(err);
  }

  if (name.length === 0) {
    const err = InvalidUserNameError.new(`User name must not be empty`);
    return left(err);
  }

  return right(name as UserName);
};
