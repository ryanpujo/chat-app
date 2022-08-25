import { hash } from 'bcrypt';
import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
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
    array: true,
    default: [Role.USER],
  })
  roles: Role[];

  @Column({ type: 'bigint', default: Date.now() })
  createdat: number;

  @Column({ type: 'bigint', default: Date.now() })
  modifiedat: number;

  @BeforeInsert()
  default() {
    this.roles = this.roles || [Role.USER];
    this.createdat = Date.now();
    this.modifiedat = Date.now();
  }

  @BeforeInsert()
  async encryptPassword() {
    const encrypted = await hash(this.password, 10);
    this.password = encrypted;
  }
}
