"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const microservices_1 = require("@nestjs/microservices");
const app_module_1 = require("./app.module");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.connectMicroservice({
        transport: microservices_1.Transport.KAFKA,
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
                groupId: process.env.KAFKA_STOREFRONT_INTEGRATION_SERVICE_GROUPID,
            },
        },
    });
    await app.startAllMicroservices();
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map