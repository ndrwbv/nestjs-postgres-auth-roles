import { IsString, IsNumber, IsEmail } from 'class-validator';

export enum IGrant {
  ADMIN = 0,
  TEACHER = 1,
  STUDENT = 2,
}

export class UserModel {
  readonly id: number;

  @IsEmail()
  email: string;

  @IsString()
  name: string;

  @IsString()
  password: string;

  class_id?: number;

  @IsNumber()
  grant: IGrant;
}
