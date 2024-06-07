import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { OceanPlasticLocationModule } from './ocean-plastic-location/ocean-plastic-location.module';
import { FireLocationModule } from './fire-location/fire-location.module';
@Module({
  imports: [
    UserModule,
    PrismaModule,
    AuthModule,
    OceanPlasticLocationModule,
    FireLocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
