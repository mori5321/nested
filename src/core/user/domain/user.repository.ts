import { Either } from 'fp-ts/lib/Either';
import { User } from './user';
// import { UserId } from './userId';
// import { Option } from 'fp-ts/lib/Option';
import { UserError } from './user.error';

export abstract class UserRepository {
  readonly list: () => Promise<Either<UserError[], User>[]>;
  // readonly getById: (id: UserId) => Promise<Option<User>>;
  // readonly store: (user: User) => Promise<Either<UserRepositoryError, UserId>>;
  // readonly remove: (id: UserId) => Promise<Either<UserRepositoryError, UserId>>;
}
