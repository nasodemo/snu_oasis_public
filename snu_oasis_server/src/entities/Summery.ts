import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity
  } from "typeorm";
  
  @Entity("summery")
  export class SummeryEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
      type: "varchar",
      length: 255,
      nullable: false
    })
    word: string;
    
    @Column({
      type: "text",
      nullable: true
    })
    summery: string;
  }