import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { OceanPlasticLocationService } from './ocean-plastic-location.service';
import { OceanPlasticLocationController } from './ocean-plastic-location.controller';

@Module({
  imports: [PrismaModule],
  providers: [OceanPlasticLocationService],
  controllers: [OceanPlasticLocationController],
})
export class OceanPlasticLocationModule {}
