'use strict';
const User = require('../../models/user.model');
const Post = require('../../models/post.model');
const Hashtag = require('../../models/hashtag.model');

exports.viewMainPage = async (req, res, next) => {
        // 메인 화면 전환시, 계시글이 있으면 불러오기
    try {
        const posts = await Post.findAll({
            // 사용자 정보(게시글 쓴 사람)
            include: {
                model: User,
                attributes: ['id', 'nick']
            },
            // 게시글 불러오기
            // 최신순으로 정렬(내림차순)
            order: [['createdAt', 'DESC']]
        })
        res.render('main', {
            title: 'Short Message Service',
            twits: posts,  // 메인화면에서 보여줄 트윗들..
        });
    } catch(error) {
        console.error(error);
        next(error);
    }
};

exports.viewJoinPage = async (req, res, next) => {
    try {
        res.render('join', {title: '가입 페이지 - Short Message'});

    } catch(error) {
        console.error(error);
        next(error);
    }
};

exports.viewProfilePage = async (req, res, next) => {
    try {
        res.render('profile', {title: '내 정보 - Short Message'});
    } catch(error) {
        console.error(error);
        next(error);
    }
};

exports.viewHashTagPage = async (req, res, next) => {
    const query = req.query.hashtag;

    if (!query) {
        // 쿼리가 없는 경우
        return res.redirect('/');
    }
    try {
        const hashtag = await Hashtag.findOne({ where: { title: query } });
        let posts = [];
        if (hashtag) {
            // hashtag에 속해있는 post들을 가져 온다.
            posts = await hashtag.getPosts({
                // 글 작성자
                include: [{ model: User, attributes: ['id', 'nick']}],
                // 최신순
                order: [['createdAt', 'DESC']]
            });
        }

        return res.render('main', {
            title: `${query} | Short Message Service`,
            twits: posts,
        });
    } catch (error) {
        console.error(error);
        return next(error);
    }
};