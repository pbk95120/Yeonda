import { Address } from '@src/models/address.model';
import { Tag } from '@src/models/tag.model';
import { User } from '@src/models/user.model';

interface IMyProfile
  extends Pick<User, 'email' | 'nickname' | 'gender' | 'birth' | 'picture_url'>,
    Pick<Address, 'latitude' | 'longitude' | 'detail'> {
  tags: Tag['id'][];
}

export class MyProfile implements IMyProfile {
  email: string;
  nickname: string;
  gender: 'Male' | 'Female';
  birth: string;
  picture_url: string;
  latitude: number;
  longitude: number;
  detail: string;
  tags: number[];

  constructor(userAddress: User & Address, tags: Tag['id'][]) {
    Object.assign(this, userAddress);
    this.tags = tags;
  }
}

export interface MySetting extends Pick<User, 'picture_url'>, Pick<Address, 'detail'> {}
