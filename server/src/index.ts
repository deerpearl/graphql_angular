import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import schema from './graphql/schema';
import casual from 'casual';
import cors from 'cors';
import 'reflect-metadata';
import { DataSource } from 'typeorm';

let postsIds: string[] = [];
let usersIds: string[] = [];

const mocks = {
    User: () => ({
        id: () => {let uuid = casual.uuid; usersIds.push(uuid); 
            return uuid},
        fullName: casual.full_name,
        bio: casual.text,
        email: casual.email,
        username: casual.username,
        password: casual.password,
        image: 'https://picsum.photos/seed/picsum/200/300',
        coverImage:
            'https://picsum.photos/seed/picsum/200/300',
        postsCount: () => casual.integer(0)
    }),
    Post: () => ({
        id: () => {let uuid = casual.uuid; postsIds.push(uuid);
            return uuid},
        text: casual.text,
        image: 'https://picsum.photos/seed/picsum/200/300',
        commentsCount: () => casual.integer(0),
        likesCount: () => casual.integer(0),
        latestLike: casual.first_name,
        createdAt: () => casual.date(),
        author: casual.random_element(usersIds),
    }),
    Comment: () => ({
        id: casual.uuid,
        Comment: casual.text,
        post: casual.random_element(postsIds),
        createdAt: () => casual.date(),
        author: casual.random_element(usersIds)
    }),
    Like: () => ({
        id: casual.uuid,
        post: casual.uuid,
        user: casual.random_element(usersIds),
    }),
    Query: () => ({
        getPostsByUserId: () =>
            [...new Array(casual.integer(2, 10))],
        getFeed: () => [...new Array(casual.integer(10, 100))],
        getNotificationsByUserId: () =>
            [...new Array(casual.integer(2, 10))],
        getCommentsByPostId: () =>
            [...new Array(casual.integer(2, 10))],
        getLikesByPostId: () =>
            [...new Array(casual.integer(2, 10))],
        searchUsers: () =>
            [...new Array(casual.integer(2, 10))]
    })
};

async function startApolloServer() {
    const PORT = 8080;
    const app: Application = express();
    app.use(cors());
    const server: ApolloServer = new ApolloServer({ schema });
    await server.start();
    server.applyMiddleware({
        app,
        path: '/graphql'
    });

    app.listen(PORT, () => {
        console.log(`Server is running at http://localhost:${PORT}`);
    });
}

const dataSource = new DataSource({
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "dbuser",
    "password": "p4ssw0rd",
    "database": "socialdb",
    "synchronize": true,
    "logging": false,
    "entities": [
    "src/entity/**/*.ts"
    ],
    "migrations": [
    "src/migration/**/*.ts"
    ],
    "subscribers": [
    "src/subscriber/**/*.ts"
    ]
});

dataSource.initialize().then(() => { startApolloServer();
}).catch(error => console.log("Database connection error: ", error));

