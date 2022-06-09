import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { CartProductService } from './cart-product.service';
import { CartProductResolver } from './cart-product.resolver';
import { CartProductController } from './cart-product.controller';
import { StorefrontProductModule } from './../storefront-product/storefront-product.module';
import { StorefrontProductService } from './../storefront-product/storefront-product.service';
import { ProductStorefrontMappingService } from '../product-mapping/product-storefront-mapping.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    StorefrontProductModule,
    ClientsModule.register([
      {
        name: process.env.KAFKA_STOREFRONT_INTEGRATION_SERVICE_CLIENT,
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: process.env.KAFKA_STOREFRONT_INTEGRATION_SERVICE_CLIENTID,
            brokers: [process.env.KAFKA_SERVER],
            ssl: true,
            sasl: {
              mechanism: 'plain',
              username:
                process.env.KAFKA_STOREFRONT_INTEGRATION_SERVICE_API_KEY,
              password:
                process.env.KAFKA_STOREFRONT_INTEGRATION_SERVICE_API_SECRET,
            },
          },
          consumer: {
            // This groupId need to match what used in cart-product.module.ts
            // Otherwise, the consumer won't assign to topic partitions correctly
            groupId: process.env.KAFKA_STOREFRONT_INTEGRATION_SERVICE_GROUPID,
          },
        },
      },
    ]),
  ],
  providers: [
    CartProductResolver,
    CartProductService,
    StorefrontProductService,
    ProductStorefrontMappingService,
  ],
  controllers: [CartProductController],
})
export class CartProductModule {}
