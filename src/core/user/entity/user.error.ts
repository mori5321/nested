import { IError } from '../../../utils/error';

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
