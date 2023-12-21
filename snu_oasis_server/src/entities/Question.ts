import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity
  } from "typeorm";
  
  @Entity("questions")
  export class QuestionEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      type: "varchar",
      length: 255,
      nullable: false
    })
    word: string;

    @Column('jsonb', {
      nullable: true
    })
    questions?: { question?: string; tag?: string, answer?: string }[];
  }