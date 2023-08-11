import { mkUser } from './user';
import { v4 as genUUID } from 'uuid';
import { right, left } from 'fp-ts/lib/Either';

describe('mkUser', () => {
  const userId = genUUID();

  it('should return a valid user', () => {
    const user = mkUser(userId, 'John Doe');
    expect(user).toEqual(right({ id: userId, name: 'John Doe' }));
  });

  it('should return left with empty user name', () => {
    const user = mkUser(userId, '');
    expect(user).toEqual(
      left([
        {
          message: 'User name must not be empty',
          __tag: 'InvalidUserNameError',
        },
      ]),
    );
  });

  it('should return left with empty user name', () => {
    const user = mkUser(userId, 'more than 16 characters');
    expect(user).toEqual(
      left([
        {
          message: 'User name must be less than 16 characters',
          __tag: 'InvalidUserNameError',
        },
      ]),
    );
  });

  it('should return left with invalid id(= 32 chars)', () => {
    const user = mkUser(
      'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      'John Doe',
    );
    expect(user).toEqual(
      left([
        {
          message: 'User id must be UUID v4(32 characters)',
          __tag: 'InvalidUserIdError',
        },
      ]),
    );
  });

  it('can return multiple errors', () => {
    const user = mkUser('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', '');
    expect(user).toEqual(
      left([
        {
          message: 'User id must be UUID v4(32 characters)',
          __tag: 'InvalidUserIdError',
        },
        {
          message: 'User name must not be empty',
          __tag: 'InvalidUserNameError',
        },
      ]),
    );
  });
});
