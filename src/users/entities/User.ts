import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity({ database: 'myDatabase' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  fname: string;

  @Column({ type: 'varchar', nullable: false })
  lname: string;

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
    default: [Role.ADMIN],
  })
  roles: Role[];

  @Column({ type: 'bigint', nullable: false, default: Date.now })
  createdat: number;

  @Column({ type: 'bigint', nullable: false, default: Date.now })
  modifiedat: number;
}
