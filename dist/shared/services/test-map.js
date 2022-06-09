"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const map_service_1 = require("./mapping/map.service");
class UserEntity {
}
class CustomerDto {
}
const userEntity = new UserEntity();
userEntity.id = 123;
userEntity.userName = 'John Smith';
const mapper = {
    customerNumber: 'id',
    name: 'userName',
    slug: (userEntity) => userEntity.userName.toLowerCase().replace(/\s/g, '-'),
};
const mapService = new map_service_1.MapService();
async function main() {
    const customerDto = mapService.map(userEntity, mapper);
    console.log(customerDto);
    const origMap = new Map([
        [1, 'a'],
        [2, 'b'],
    ]);
    console.log(...origMap);
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
});
//# sourceMappingURL=test-map.js.map