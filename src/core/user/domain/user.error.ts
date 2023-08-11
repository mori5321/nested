import { IError } from '../../../utils/error';

export type UserError = UserDomainError | UserInfraError;
export type UserDomainError = InvalidUserIdError | InvalidUserNameError;
export type UserInfraError = UserRepositoryError;

export type InvalidUserIdError = IError<'InvalidUserIdError'>;
export const InvalidUserIdError = {
  new: (message: string): InvalidUserIdError => ({
    message,
    __tag: 'InvalidUserIdError',
  }),
};

export type InvalidUserNameError = IError<'InvalidUserNameError'>;
export const InvalidUserNameError = {
  new: (message: string): InvalidUserNameError => ({
    message,
    __tag: 'InvalidUserNameError',
  }),
};

export type UserRepositoryError = IError<'UserRepositoryError'>;
export const UserRepositoryError = {
  new: (message: string): UserRepositoryError => ({
    message,
    __tag: 'UserRepositoryError',
  }),
};
