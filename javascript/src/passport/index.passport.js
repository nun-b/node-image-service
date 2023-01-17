const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const User = require('../models/user.model');

module.exports = () => {
    passport.serializeUser((user, done) => {    // user -> exUser
        // Login할 때 호출

        // done(에러발생 코드, 저장할 값)
        // { 세션 쿠키 : 유저 아아디 } -> 세션에 저장 => { 1212121212 : user.id }
        // 정보는 메모리에 저장되기 때문에 아이디만 지정(최소한으로)
        // 세션 쿠키는 임으로(무작위) 만든다.

        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        // 접속할 때 마다 호출
        // 전해지는 세션 쿠키로 부터, 유저 아이디를 찾아 내서
        // 유저(req.user)를 복원시킨다.
        User.findOne({
            where: { id },
            include: [{
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followers',
            }, // 팔로윙
            {                
                model: User,
                attributes: ['id', 'nick'],
                as: 'Followings',
            }], // 팔로워
        })
        .then(user => done(null, user))
        // 복원된 user는 req.user로 만들고
        // req.user는 메인 라우터에 공통 변수(res.locals.user)에 저장되어
        // 모든 라우터에서 req.user를 사용한다.

        // req.session()도 생성된다.
        // 사용자에게 종속된(유지되는) 데이터 저장
        .catch(err => done(err));
    });

    local();
    kakao();
};