import { Injectable } from '@nestjs/common';
import { Either } from 'fp-ts/lib/Either';
import { User, mkUser } from '../domain/user';
import { UserRepository } from '../domain/user.repository';
import { UserError } from '../domain/user.error';

@Injectable()
export class UserRepositoryInMemory implements UserRepository {
  constructor() {}

  async list(): Promise<Either<UserError[], User>[]> {
    const eUsers = [
      mkUser('b5ebd8c8-4d5e-42ce-879b-3c59c21d8485', 'John'),
      mkUser('b5ebd8c8-4d5e-42ce-879b-3c59c21d8481', 'Hello'),
      mkUser('b5ebd8c8-4d5e-42ce-879b-3c59c21d8482', 'World'),
    ];

    return eUsers;
  }
}
