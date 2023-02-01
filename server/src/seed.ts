import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { runSeeders, SeederOptions } from "typeorm-extension";
import { User } from "./entity/User";
import { Post } from "./entity/Post";
import { Comment } from "./entity/Comment";
import { Like } from "./entity/Like";
import { Notification } from "./entity/Notification";
import { UsersFactory } from "./database/factories/user.factory";
import { PostsFactory } from "./database/factories/post.factory";
import { CommentsFactory } from "./database/factories/comment.factory";
import { LikesFactory } from "./database/factories/like.factory";
import { NotificationsFactory} from "./database/factories/notification.factory";
import MainSeeder from "./database/seeds/main.seeder";

const {
  DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME,
} = process.env;

const options: DataSourceOptions & SeederOptions = {
  type: "mysql",
  host: DB_HOST || "localhost",
  port: Number(DB_PORT) || 3306,
  username: DB_USER || "dbuser",
  password: DB_PASSWORD || "p4ssw0rd",
  database: DB_NAME || "socialdb",
  entities: [User, Post, Comment, Like, Notification],
  // additional config options brought by typeorm-extension
  factories: [UsersFactory, PostsFactory, CommentsFactory, LikesFactory, NotificationsFactory],
  seeds: [MainSeeder],
};

const dataSource = new DataSource(options);

dataSource.initialize().then(async () => {
  await dataSource.synchronize(true);
  await runSeeders(dataSource);
  process.exit();
});