import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import { CorsOptions } from './routers/middleware/options';
import { error404, errorHandler } from './routers/middleware/error';

import indexRouter from './routers/index.router';

(() => {
    const result = dotenv.config({ path: path.join(__dirname, "config", ".env") });
    if (result.parsed == undefined) throw new Error("Cannot loaded environment variables file.");
})();

const server: Application = express();
server.use(morgan('dev'));
server.use(cors(CorsOptions));
server.use('/', express.static(path.join(__dirname, 'public')));
server.use('/img', express.static(path.join(__dirname, 'upload')));
server.use(express.json());
server.use(express.urlencoded({extended: false}));
server.use(cookieParser(process.env.COOKIE_SECRET));
server.use(session({
    resave: false,
    saveUninitialized: false,
    // 실행 전이기 때문에 COOKIE_SECRET이 string | undefined 타입으로 설정되어
    // 에러가 발생, '!'를 붙여서 문자열이라는 것을 보증한다(undefined가 아니라는 걸 보증)
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