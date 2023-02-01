import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Like } from '../../entity/Like';

export const LikesFactory = setSeederFactory(Like, (faker: Faker) => {
    const like = new Like();
    like.createdAt = faker.date.past();
    return like;
});

/*

import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Like } from '../../entity/Like';
define(Like, (faker: typeof Faker) => {
 const like = new Like();
 like.createdAt = faker.date.past();
 return like;
});
*/