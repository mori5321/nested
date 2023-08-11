
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export interface User {
    id: string;
    name: string;
}

export interface UsersSuccess {
    users?: Nullable<User[]>;
}

export interface UsersError {
    errors?: Nullable<string[]>;
}

export interface IQuery {
    hello(): string | Promise<string>;
    user(id: string): Nullable<User> | Promise<Nullable<User>>;
    users(): Nullable<UsersPayload> | Promise<Nullable<UsersPayload>>;
}

export type UsersPayload = UsersSuccess | UsersError;
type Nullable<T> = T | null;
