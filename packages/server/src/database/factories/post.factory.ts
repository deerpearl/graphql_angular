/*
import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Post } from '../../entity/Post';
import { User } from '../../entity/User';

export const UsersFactory = setSeederFactory(User, (faker: Faker) => {
 const post = new Post();
 post.text = faker.lorem.text();
 post.image = faker.image.imageUrl();
 post.commentsCount = 100;
 post.likesCount = 200;
 post.latestLike = faker.name.findName();
 post.createdAt = faker.date.past();
 return post;
});

*/


import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Post } from "../../entity/Post";
import { Like } from "../../entity/Like";

export const PostsFactory = setSeederFactory(Post, (faker: Faker) => {
    const post = new Post();
    post.text = faker.lorem.text();
    post.image = faker.image.imageUrl();
    post.commentsCount = 100;
    post.likesCount = 200;
    post.createdAt = faker.date.past();
    return post;
});
