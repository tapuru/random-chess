import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './profile.entity';
import { Repository } from 'typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(Profile)
    private readonly profileRepository: Repository<Profile>,
  ) {}

  getProfileById(profileId: string) {
    return this.profileRepository.findOne({ where: { id: profileId } });
  }

  getProfileByUserId(userId: string) {
    return this.profileRepository.findOne({ where: { user: { id: userId } } });
  }

  async createProfile(user: User, username: string, photo?: string) {
    const profile = this.profileRepository.create({
      user,
      photo,
      username,
      isOnline: false,
    });
    return this.profileRepository.save(profile);
  }

  editProfile() {}
}
