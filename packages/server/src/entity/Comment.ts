import {
    Entity, Column, PrimaryGeneratedColumn,
    CreateDateColumn, AfterInsert} from 'typeorm';

import { ManyToOne } from 'typeorm';
import { User } from './User';
import { Post } from './Post';
import { Notification } from './Notification';
import { dataSource } from './../index';

@Entity()
export class Comment {
    @PrimaryGeneratedColumn() id: number;
    @Column("text") comment: string;
    @CreateDateColumn() createdAt: Date;

    @ManyToOne(type => User, user => user.comments, {
        onDelete: 'CASCADE'
    }) author: User;
    @ManyToOne(type => Post, post => post.comments, {
        onDelete: 'CASCADE'
    }) post: Post;

    @AfterInsert()
    async createNotification() {
      if (this.post && this.post.id) {
        const notificationRepository = dataSource.getRepository(Notification);
        const notification = notificationRepository.create();
        notification.user = await dataSource.getRepository(User).createQueryBuilder("user")
          .innerJoinAndSelect("user.posts", "post")
          .where("post.id = :id", { id: this.post.id })
          .getOne() as User;
        notification.postId = this.post.id;
        notification.text = `${this.author.fullName} commented on your post`;
        await notificationRepository.save(notification);
      }
    }
}