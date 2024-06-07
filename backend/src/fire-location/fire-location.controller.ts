import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { FireLocationService } from './fire-location.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('fire-locations')
export class FireLocationController {
  constructor(private readonly fireLocationService: FireLocationService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.fireLocationService.findAll();
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(
    @Body()
    data: {
      latitude: number;
      longitude: number;
      name: string;
      description?: string;
    },
  ) {
    return this.fireLocationService.create(data);
  }
}
