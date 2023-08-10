import { Either } from 'fp-ts/lib/Either';
import { User } from './user';
import { UserId } from './userId';
import { Option } from 'fp-ts/lib/Option';
import { UserRepositoryError } from './user.error';

export type UserRepository = {
  readonly list: () => Promise<User[]>;
  readonly getById: (id: UserId) => Promise<Option<User>>;
  readonly store: (user: User) => Promise<Either<UserRepositoryError, UserId>>;
  readonly remove: (id: UserId) => Promise<Either<UserRepositoryError, UserId>>;
};
