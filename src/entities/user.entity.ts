import BaseEntity from './base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column()
  name: string;

  @Column({
    unique: true,
  })
  email: string;

  @Column({
    select: false,
  })
  password: string;

  @Column({
    nullable: false,
  })
  grant: number;
}
