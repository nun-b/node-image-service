import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import express, { Application, RequestHandler } from 'express';
import { corsOptions } from './routers/middleware/options';
import { error404, errorHandler } from './routers/middleware/errors';
import IUser from './models/user.model';

import indexRouter from './routers/index.router';

declare global {
    // Error 객체에 status 속성을 추가
    interface Error { status: number; }
    // index.passport에 user.id에서 에러
    // Express.User{} 속성에 아무것도 없음
    // User 테이블 속성들을 가져와서, Express.User{}에 속성 추가
    namespace Express {
        interface User extends IUser { }
    }
}

(() => {
    const result = dotenv.config({ path: path.join(__dirname, "config", ".env") });
    if (result.parsed == undefined) throw new Error("Cannot loaded environment variables file.");
})();

const server: Application = express();
server.use(morgan('dev'));
server.use(cors(corsOptions));
server.use('/', express.static(path.join(__dirname, 'public')));
server.use('/img', express.static(path.join(__dirname, 'upload')));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(session({
    resave: false,
    saveUninitialized: false,
    // COOKIE_SECRET이 'string | undefined' 타입으로 설정되어 있어 에러
    // '!'를 붙여서 문자열(undefined가 아니라는 걸) 보증한다.
    secret: process.env.COOKIE_SECRET!,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));

server.use('/', indexRouter);

server.use(error404);
server.use(errorHandler);

server.listen(process.env.PORT, () => {
    console.log(`SERVER :: http://localhost:${process.env.PORT}`);
});