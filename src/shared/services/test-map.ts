import { MapService } from './mapping/map.service';
import { Mapper } from './mapper/mapper';

class UserEntity {
  id: number;
  userName: string;
}

class CustomerDto {
  name: string;
  customerNumber: number;
  slug: string;
}

const userEntity = new UserEntity();
userEntity.id = 123;
userEntity.userName = 'John Smith';

const mapper: Mapper<UserEntity, CustomerDto> = {
  customerNumber: 'id',
  name: 'userName',
  slug: (userEntity: UserEntity) =>
    userEntity.userName.toLowerCase().replace(/\s/g, '-'),
};

const mapService = new MapService();

// const customerDto: CustomerDto = mapService.map<UserEntity, CustomerDto>(
//   userEntity,
//   mapper,
// );

async function main(): Promise<void> {
  const customerDto: CustomerDto = mapService.map<UserEntity, CustomerDto>(
    userEntity,
    mapper,
  );
  console.log(customerDto);

  const origMap = new Map([
    [1, 'a'],
    [2, 'b'],
  ]);
  console.log(...origMap);

  // // Reverse:
  // const inv = new Map(Array.from(origMap, (a) => a.reverse()));
  // console.log(...inv);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

// const appDiv: HTMLElement = document.getElementById('app');
// appDiv.innerHTML = `<h1>Result</h1><pre><code>${JSON.stringify(
//   customerDto,
//   null,
//   '\t',
// )}</code></pre>`;
