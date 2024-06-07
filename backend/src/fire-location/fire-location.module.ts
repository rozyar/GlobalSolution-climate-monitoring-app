import { Module } from '@nestjs/common';
import { FireLocationService } from './fire-location.service';
import { FireLocationController } from './fire-location.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [FireLocationService],
  controllers: [FireLocationController],
})
export class FireLocationModule {}
