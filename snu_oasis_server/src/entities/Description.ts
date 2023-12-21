import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity
  } from "typeorm";
  
  @Entity("descriptions")
  export class DescriptionEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({
      type: "varchar",
      length: 255,
      nullable: false
    })
    word: string;

    @Column('jsonb', {
      nullable: true,
    })
    descriptions: { content: string; catagory: string }[];
  }