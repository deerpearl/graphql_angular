/*
import Faker from 'faker';
import { define, factory } from 'typeorm-seeding';
import { Comment } from '../../entity/Comment';
define(Comment, (faker: typeof Faker) => {
 const comment = new Comment();
 comment.comment = faker.lorem.text();
 comment.createdAt = faker.date.past();
 return comment;
});
*/

import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Comment } from '../../entity/Comment';

export const CommentsFactory = setSeederFactory(Comment, (faker: Faker) => {
    const comment = new Comment();
    comment.comment = faker.lorem.text();
    comment.createdAt = faker.date.past();
    return comment;
});