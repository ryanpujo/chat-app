import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Role } from '../types/user';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  Fname: string;

  @Column({ type: 'varchar', nullable: false })
  Lname: string;

  @Column({ type: 'varchar', unique: true, nullable: false, length: 10 })
  username: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ type: 'varchar', nullable: false })
  password: string;

  @Column({
    type: 'enum',
    enum: Role,
    nullable: false,
    array: true,
    default: [Role.USER],
  })
  roles: Role[];

  @Column({ type: 'bigint', nullable: false, default: Date.now })
  createdAt: number;

  @Column({ type: 'bigint', nullable: false, default: Date.now })
  modifiedAt: number;
}
