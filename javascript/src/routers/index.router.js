'use strict';
const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middleware/login-status');
const { viewMainPage, viewJoinPage, viewHashTagPage, viewProfilePage } = require('./controllers/index.control.js');

const router = express.Router();

router.use((req, res, next) => {
    // 라우터들에서 공통적으로 쓰이는 변수 설정
    res.locals.user = req.user;     // req.user 사용자 정보
    res.locals.followerCount = req.user?.Followers?.length || 0;
    res.locals.followingCount = req.user?.Followings?.length || 0;
    res.locals.followingIdList = req.user?.Followings?.map(f => f.id) || [];
    next();
});

router.get('/', viewMainPage);
// 로그인 안한 사람만, 회원가입 할수 있도록 한다.
router.get('/join', isNotLoggedIn, viewJoinPage);
// 로그인 한 사람만, 프로파일을 보여 준다.
router.get('/profile', isLoggedIn, viewProfilePage);
// 헤시태그 찾기 -> hashtag?hashtag=고양이
router.get('/hashtag', viewHashTagPage);

module.exports = router;