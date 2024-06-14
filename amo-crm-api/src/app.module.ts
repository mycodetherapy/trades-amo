import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AmoCRMController } from './app.controller';
import { AmoCRMService } from './app.service';
import { CorsMiddleware } from './cors.middleware';

@Module({
  imports: [],
  controllers: [AmoCRMController],
  providers: [AmoCRMService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(CorsMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
