import { getSemigroup } from 'fp-ts/lib/Array';
import { Flavor } from '../../../utils/flavor';
import * as E from 'fp-ts/lib/Either';
import { Either, right, left } from 'fp-ts/lib/Either';
import { pipe } from 'fp-ts/lib/function';
import { sequenceS } from 'fp-ts/lib/Apply';

type Validation<E, A> = E.Either<E[], A>;
const lift: <E, A>(body: Either<E, A>) => Validation<E, A> = (body) =>
  pipe(
    body,
    E.mapLeft((a) => [a]),
  );

const getValidation = <T>() => E.getApplicativeValidation(getSemigroup<T>());

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
  return sequenceS(getValidation<UserError>())({
    id: lift(mkUserId(id)),
    name: lift(mkUserName(name)),
  });
};

export type User = {
  id: UserId;
  name: UserName;
};
