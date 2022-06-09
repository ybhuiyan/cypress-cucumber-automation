"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MapService = void 0;
const common_1 = require("@nestjs/common");
let MapService = class MapService {
    map(source, mapper) {
        const destination = {};
        for (const key in mapper) {
            const val = mapper[key];
            if (this.isFunction(val)) {
                destination[key] = val(source);
            }
            else if (this.isUndefined(val)) {
                destination[key] = source[val];
            }
        }
        return destination;
    }
    isFunction(val) {
        return typeof val === 'function';
    }
    isUndefined(val) {
        return typeof val !== 'undefined';
    }
};
MapService = __decorate([
    (0, common_1.Injectable)()
], MapService);
exports.MapService = MapService;
//# sourceMappingURL=map.service.js.map