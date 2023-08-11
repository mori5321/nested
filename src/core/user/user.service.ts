import { Injectable } from '@nestjs/common';
import { User } from './domain/user';
import { isLeft, Either, left, right, Applicative } from 'fp-ts/lib/Either';
import { sequence } from 'fp-ts/lib/Array';
import { UserError } from './domain/user.error';
import { pipe } from 'fp-ts/lib/function';
import { UserRepository } from './domain/user.repository';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async list(): Promise<Either<UserError[], User[]>> {
    const eUsers = await this.userRepository.list();

    return pipe(eUsers, sequence(Applicative), (either) => {
      if (isLeft(either)) {
        // eUsers 参照しちゃってるのが微妙すぎるな...
        return left(eUsers.flatMap((e) => (isLeft(e) ? e.left : [])));
      }

      return right(either.right);
    });
  }
}
