import { sequenceS } from 'fp-ts/lib/Apply';
import { getSemigroup } from 'fp-ts/lib/Array';
import { pipe } from 'fp-ts/lib/function';
import { Either, mapLeft, getApplicativeValidation } from 'fp-ts/lib/Either';

type Validation<E, A> = Either<E[], A>;
export const lift: <E, A>(body: Either<E, A>) => Validation<E, A> = (body) =>
  pipe(
    body,
    mapLeft((a) => [a]),
  );

const getValidation = <T>() => getApplicativeValidation(getSemigroup<T>());

export const validation = <E>() => sequenceS(getValidation<E>());
