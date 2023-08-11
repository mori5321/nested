import { Resolver, Query, ResolveField } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UsersError, UsersPayload, UsersSuccess } from '../../graphql';
import { isLeft } from 'fp-ts/lib/Either';

@Resolver()
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query('users')
  async users(): Promise<UsersPayload> {
    const users = await this.userService.list();

    if (isLeft(users)) {
      return {
        errors: users.left.map((err) => err.message),
      };
    } else {
      return {
        users: users.right,
      };
    }
  }
}

@Resolver('UsersPayload')
export class UsersPayloadResolver {
  @ResolveField()
  __resolveType(obj: UsersError | UsersSuccess) {
    if ('errors' in obj) {
      return 'UsersError';
    }

    if ('users' in obj) {
      return 'UsersSuccess';
    }

    return null;
  }
}
