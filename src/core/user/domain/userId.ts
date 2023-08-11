import { Either, right, left } from 'fp-ts/lib/Either';
import { InvalidUserIdError } from './user.error';
import { Flavor } from '../../../utils/flavor';

export type UserId = Flavor<string, 'UserId'>;
export const mkUserId = (id: string): Either<InvalidUserIdError, UserId> => {
  if (id.length !== 36) {
    const err = InvalidUserIdError.new(
      `User id must be UUID v4(32 characters)`,
    );
    return left(err);
  }

  return right(id as UserId);
};
