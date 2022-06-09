import { Injectable } from '@nestjs/common';
// import { Mapper } from '../mapper/mapper';

type FilteredKeys<T, U> = {
  [P in keyof T]: T[P] extends U ? P : never;
}[keyof T];

export type Mapper<S, D> = {
  [DK in keyof D]?: FilteredKeys<S, D[DK]> | ((source: S) => D[DK]);
};

function isFunction(val: any): val is () => string {
  return typeof val === 'function';
}

function isUndefined(val: any): val is string {
  return typeof val !== 'undefined';
}

@Injectable()
export class MapService {
  public map<S, D>(source: S & { [key: string]: any }, mapper: Mapper<S, D>) {
    const destination: any = {} as D;
    for (const key in mapper) {
      const val = mapper[key];
      if (isFunction(val)) {
        destination[key] = val(source);
      } else if (isUndefined(val)) {
        destination[key] = source[val];
      }
    }
    return destination;
  }
}
