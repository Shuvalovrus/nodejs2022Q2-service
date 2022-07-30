import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  login: string;

  @Column()
  password: string;

  @VersionColumn()
  version: number;

  @CreateDateColumn()
  createdAt: number;

  @UpdateDateColumn()
  updatedAt: number;

  toResponse() {
    const { id, login, version, createdAt, updatedAt } = this;
    return { id, login, version, createdAt: +createdAt, updatedAt: +updatedAt };
  }
}
