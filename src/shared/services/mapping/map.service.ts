import { Injectable } from '@nestjs/common';
import { Mapper } from '../mapper/mapper';

@Injectable()
export class MapService {
  public map<S, D>(source: S & { [key: string]: any }, mapper: Mapper<S, D>) {
    const destination: any = {} as D;
    for (const key in mapper) {
      const val = mapper[key];
      if (this.isFunction(val)) {
        destination[key] = val(source);
      } else if (this.isUndefined(val)) {
        destination[key] = source[val];
      }
    }
    return destination;
  }

  private isFunction(val: any): val is () => string {
    return typeof val === 'function';
  }

  private isUndefined(val: any): val is string {
    return typeof val !== 'undefined';
  }
}
