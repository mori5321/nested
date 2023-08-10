import { Flavor } from '../../../utils/flavor';
import { validation, lift } from '../../../utils/validation';
import { Either, right, left } from 'fp-ts/lib/Either';

export type User = {
  id: UserId;
  name: UserName;
};

type UserId = Flavor<string, 'UserId'>;
type UserName = Flavor<string, 'UserName'>;

type Error<K extends string> = Flavor<
  {
    message: string;
  },
  K
>;

type InvalidUserIdError = Error<'InvalidUserIdError'>;
const InvalidUserIdError = {
  new: (message: string): InvalidUserIdError => ({
    message,
    __tag: 'InvalidUserIdError',
  }),
};

type InvalidUserNameError = Error<'InvalidUserNameError'>;
const InvalidUserNameError = {
  new: (message: string): InvalidUserNameError => ({
    message,
    __tag: 'InvalidUserNameError',
  }),
};

type UserError = InvalidUserIdError | InvalidUserNameError;

const mkUserId = (id: string): Either<InvalidUserIdError, UserId> => {
  if (id.length !== 36) {
    const err = InvalidUserIdError.new(
      `User id must be UUID v4(32 characters)`,
    );
    return left(err);
  }

  return right(id as UserId);
};

const mkUserName = (name: string): Either<InvalidUserNameError, UserName> => {
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

export const mkUser = (id: string, name: string): Either<UserError[], User> => {
  return validation<UserError>()({
    id: lift(mkUserId(id)),
    name: lift(mkUserName(name)),
  });
};
