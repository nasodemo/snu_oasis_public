import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity
  } from "typeorm";
  
  @Entity("testEntries")
  export class Entry extends BaseEntity {
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

    @Column('jsonb', {  
      nullable: true
    })
    questions?: { question?: string; tag?: string }[];

    @Column({
      type: "text",
      nullable: true
    })
    description: string;
  }