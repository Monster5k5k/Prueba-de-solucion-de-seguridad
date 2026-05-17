import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ItemTarkov } from './entities/item-tarkov.entity';
import { TarkovController } from './tarkov.controller';
import { TarkovService } from './tarkov.service';

@Module({
  imports: [TypeOrmModule.forFeature([ItemTarkov])],
  controllers: [TarkovController],
  providers: [TarkovService],
})
export class TarkovModule {}
