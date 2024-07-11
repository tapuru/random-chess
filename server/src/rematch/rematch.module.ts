import { Module } from '@nestjs/common';
import { RematchService } from './rematch.service';
import { RematchController } from './rematch.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rematch } from './rematch.entity';

@Module({
  providers: [RematchService],
  controllers: [RematchController],
  imports: [TypeOrmModule.forFeature([Rematch])],
  exports: [RematchService],
})
export class RematchModule {}
