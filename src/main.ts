import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: process.env.KAFKA_STOREFRONT_INTEGRATION_SERVICE_CLIENTID,
        brokers: [process.env.KAFKA_SERVER],
        ssl: true,
        sasl: {
          mechanism: 'plain',
          username: process.env.KAFKA_STOREFRONT_INTEGRATION_SERVICE_API_KEY,
          password: process.env.KAFKA_STOREFRONT_INTEGRATION_SERVICE_API_SECRET,
        },
      },
      consumer: {
        // This groupId need to match what used in cart-product.module.ts
        // Otherwise, the consumer won't assign to topic partitions correctly
        groupId: process.env.KAFKA_STOREFRONT_INTEGRATION_SERVICE_GROUPID,
      },
    },
  });

  await app.startAllMicroservices();
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
