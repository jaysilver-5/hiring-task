import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CoreEntity } from "./core.entity";
import { UserEntity } from "./user.entity";

@Entity("title")
export class TitleEntity extends CoreEntity {
  @PrimaryGeneratedColumn("uuid")
  uuid: string;

  @Column({ type: "varchar", nullable: false})
  title: string;

  @ManyToOne(() => UserEntity, (user) => user.uuid, { nullable: false})
  @JoinColumn({ name: 'userId' })
  userId: UserEntity;
}