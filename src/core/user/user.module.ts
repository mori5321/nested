import { Module } from '@nestjs/common';
import { UserResolver, UsersPayloadResolver } from './user.resolver';
import { UserService } from './user.service';
import { UserRepository } from './domain/user.repository';
import { UserRepositoryInMemory } from './infra/user.repository';

@Module({
  providers: [
    UserResolver,
    UsersPayloadResolver,
    UserService,
    {
      provide: UserRepository,
      useClass: UserRepositoryInMemory,
    },
  ],
})
export class UserModule {}
