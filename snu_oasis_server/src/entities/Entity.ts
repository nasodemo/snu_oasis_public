import { BaseEntity, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
// 기본 메소드를 제공함

export default abstract class Entity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    
    @CreateDateColumn() 
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

}