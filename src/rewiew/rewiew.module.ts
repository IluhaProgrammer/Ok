import { Module } from '@nestjs/common';
import { RewiewService } from './rewiew.service';
import { RewiewController } from './rewiew.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [RewiewController],
  providers: [RewiewService, PrismaService],
})
export class RewiewModule {}
