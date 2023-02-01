import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn
} from 'typeorm';

import { OneToOne, OneToMany, ManyToOne, JoinColumn } from
    'typeorm';
import { User } from './User';
import { Comment } from './Comment';
import { Like } from './Like';

@Entity()
export class Post {
    @PrimaryGeneratedColumn() id: number;
    @Column("longtext") text: string;
    @Column({ nullable: true }) image: string;
    @Column({ default: 0 }) commentsCount: number;
    @Column({ default: 0 }) likesCount: number;
    
    @CreateDateColumn() createdAt: Date;
    @Column({ default: false }) likedByAuthUser: boolean;
    

    @ManyToOne(type => User, user => user.posts, {
        onDelete:
        'CASCADE'
    }) author: User;

    @OneToOne(type => Comment, comment => comment.post, {
        onDelete: 'SET NULL'
    })
    @JoinColumn() latestComment: Comment;
    @OneToMany(type => Comment, comment => comment.post)
    comments: Comment[];

    @OneToOne(type => Like, like => like.post, {
        onDelete: 'SET NULL'
    })
    @JoinColumn() latestLike: Like;
    @OneToMany(type => Like, like => like.post) likes:
        Like[];
}