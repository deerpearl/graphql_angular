import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { faker } from "@faker-js/faker";
import { User } from "./../../entity/User"
import { Post } from "./../../entity/Post"
import { Comment } from "./../../entity/Comment"
import { Like } from "./../../entity/Like"
import { Notification } from "./../../entity/Notification"

export default class MainSeeder implements Seeder {
    public async run(
        dataSource: DataSource,
        factoryManager: SeederFactoryManager,
    ): Promise<any> {
        // Run the factories here
        const postsRepository = dataSource.getRepository(Post);
        const commentsRepository = dataSource.getRepository(Comment);
        const likesRepository = dataSource.getRepository(Like);

        const userFactory = factoryManager.get(User);
        const commentsFactory = factoryManager.get(Comment);
        const likesFactory = factoryManager.get(Like);
        const postsFactory = factoryManager.get(Post);

        const users = await userFactory.saveMany(7);
        
        const comments = await Promise.all(
            Array(Math.floor(Math.random() * 10)
            + 1)
                .fill("")
                .map(async () => {
                    const made = await commentsFactory.make({
                        author: faker.helpers.arrayElement(users),
                    });
                    return made;
                }),
        );
        await commentsRepository.save(comments);

        const likes = await Promise.all(
            Array(Math.floor(Math.random() * 10)
            + 1)
                .fill("")
                .map(async () => {
                    const made = await likesFactory.make({
                        user: faker.helpers.arrayElement(users),
                    });
                    return made;
                }),
        );
        await likesRepository.save(likes);

        const posts = await Promise.all(
            Array(17)
                .fill("")
                .map(async () => {
                    const made = await postsFactory.make({
                        author: faker.helpers.arrayElement(users),
                        //latestComment: faker.helpers.arrayElement(comments),
                        comments: comments,
                        //latestLike: faker.helpers.arrayElement(likes),
                        likes: likes,
                    });
                    return made;
                }),
        );
        await postsRepository.save(posts);
    }
}