import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { fireLocations } from './data';

@Injectable()
export class FireLocationService implements OnModuleInit {
  constructor(private prisma: PrismaService) {}

  async onModuleInit() {
    await this.insertInitialData();
  }

  async findAll() {
    return this.prisma.fireLocation.findMany();
  }

  async create(data: {
    latitude: number;
    longitude: number;
    name: string;
    description?: string;
  }) {
    return this.prisma.fireLocation.create({
      data,
    });
  }

  async insertInitialData() {
    const count = await this.prisma.fireLocation.count();
    if (count === 0) {
      await this.prisma.fireLocation.createMany({
        data: fireLocations,
      });
      console.log('Initial data inserted');
    } else {
      console.log('Initial data already exists');
    }
  }
}
