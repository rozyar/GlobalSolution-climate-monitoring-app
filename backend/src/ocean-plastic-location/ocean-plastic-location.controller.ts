import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { OceanPlasticLocationService } from './ocean-plastic-location.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('ocean')
export class OceanPlasticLocationController {
  constructor(
    private readonly oceanPlasticLocationService: OceanPlasticLocationService,
  ) {}
  @UseGuards(JwtAuthGuard)
  @Get('location')
  async findAll() {
    return this.oceanPlasticLocationService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Post('location')
  async create(
    @Body()
    data: {
      latitude: number;
      longitude: number;
      name: string;
      description: string;
    },
  ) {
    return this.oceanPlasticLocationService.create(data);
  }
}
