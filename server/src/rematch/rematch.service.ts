import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rematch } from './rematch.entity';
import { ChessColors } from 'src/game/types';

@Injectable()
export class RematchService {
  constructor(
    @InjectRepository(Rematch) private rematchRepository: Repository<Rematch>,
  ) {}

  async getRematchDataByGameId(gameId: string) {
    return this.rematchRepository.findOne({ where: { game: { id: gameId } } });
  }

  async getRematchById(id: string) {
    return this.rematchRepository.findOne({ where: { id } });
  }

  async updateRematchData(id: string, data: Partial<Rematch>) {
    const rematch = await this.getRematchById(id);
    if (!rematch) {
      throw new BadRequestException('rematch-not-found');
    }
    return await this.rematchRepository.save({ ...rematch, ...data });
  }

  async createRematch({ userColor }: { userColor: ChessColors }) {
    const rematch = this.rematchRepository.create({
      blackUpForRematch: userColor === ChessColors.BLACK,
      whiteUpForRematch: userColor === ChessColors.WHITE,
    });
    return await this.rematchRepository.save(rematch);
  }

  async removeRematch(id: string) {
    return this.rematchRepository.delete(id);
  }

  async cancelRematch({
    rematchId,
    userColor,
  }: {
    userColor: ChessColors;
    rematchId: string;
  }) {
    const updateData: Partial<Rematch> = {};
    if (userColor === ChessColors.BLACK) updateData.blackUpForRematch = false;
    if (userColor === ChessColors.WHITE) updateData.whiteUpForRematch = false;
    return await this.updateRematchData(rematchId, updateData);
  }
}
