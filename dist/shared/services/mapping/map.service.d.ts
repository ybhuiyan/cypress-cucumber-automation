import { Mapper } from '../mapper/mapper';
export declare class MapService {
    map<S, D>(source: S & {
        [key: string]: any;
    }, mapper: Mapper<S, D>): any;
    private isFunction;
    private isUndefined;
}
