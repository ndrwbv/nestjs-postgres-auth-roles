import { Injectable, BadRequestException } from '@nestjs/common';
import { UserService } from './../user';
import { UserEntity } from 'entities';
import { JwtPayloadInterface } from './interfaces';
import { AuthModel } from 'models';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(payload: JwtPayloadInterface): Promise<UserEntity | null> {
    return await this.userService.findById(payload.id);
  }

  async authenticate(auth: AuthModel): Promise<any> {
    const user = await this.userService.findByEmailWithPassword(auth.email);

    if (!user) {
      throw new BadRequestException();
    }

    const isRightPassword = await this.userService.compareHash(
      auth.password,
      user.password,
    );
    if (!isRightPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    return {
      id: user.id,
      email: user.email,
      grant: user.grant,
      name: user.name,
      token: await this.jwtService.sign({ id: user.id }),
    };
  }
}
