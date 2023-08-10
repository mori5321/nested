export type Flavor<T, U extends string> = T & { __tag: U };
