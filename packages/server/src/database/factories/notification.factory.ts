/*
import Faker from 'faker';
import { define } from 'typeorm-seeding';
import { Notification } from '../../entity/Notification';
define(Notification, (faker: typeof Faker) => {
 const notification = new Notification();
 notification.text = faker.lorem.words();
 notification.postId = 1;
 notification.createdAt = faker.date.past();
 return notification;
});
*/


import { Faker } from "@faker-js/faker";
import { setSeederFactory } from "typeorm-extension";
import { Notification } from '../../entity/Notification';

export const NotificationsFactory = setSeederFactory(Notification, (faker: Faker) => {
    const notification = new Notification();
    notification.text = faker.lorem.words();
    notification.postId = 1;
    notification.createdAt = faker.date.past();
    return notification;
});