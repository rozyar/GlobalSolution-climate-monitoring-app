import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { oceanPlasticLocations } from './data';

@Injectable()
export class OceanPlasticLocationService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.insertInitialData();
  }

  async findAll() {
    return this.prisma.oceanPlasticLocation.findMany();
  }

  async create(data: {
    latitude: number;
    longitude: number;
    name: string;
    description: string;
  }) {
    return this.prisma.oceanPlasticLocation.create({
      data,
    });
  }

  async insertInitialData() {
    const count = await this.prisma.oceanPlasticLocation.count();
    if (count === 0) {
      await this.prisma.oceanPlasticLocation.createMany({
        data: oceanPlasticLocations,
      });
    }
  }
}
