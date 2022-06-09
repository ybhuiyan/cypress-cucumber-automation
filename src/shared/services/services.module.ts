import { Global, Module } from '@nestjs/common';
import { MapService } from './mapping/map.service';

@Global()
@Module({
  imports: [],
  providers: [MapService],
  exports: [MapService],
})
export class ServicesModule {}
