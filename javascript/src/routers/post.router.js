const fs = require('fs');
const path = require('path');
const multer = require('multer');
const express = require('express');

const { afterUploadImage, uploadPost } = require('../controllers/post');
const { isLoggedIn } = require('../function/login-status');

const router = express.Router();

try {
    // uploads 폴더 확인
    fs.readdirSync('uploads');
} catch (error) {
    // 없으면, 폴더 생성
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        // 파일 저장은 디스크 폴더(uploads)에 한다.
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            // 파일 저장 이름 설정
            // image.png -> image날짜.png
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },  // 5M
});

// 이미지를 업로드하고 
// -> 업로드한 이미지 정보(img-url)를 받아서,
// -> 게시글 업로드한다.(req.body.content, req.body.url)

// POST /post/img
// 이미지를 업로드 하는 루틴 ( img -> html tag 이름 )
router.post('/img', isLoggedIn, upload.single('img'), afterUploadImage);

// POST /post
// 게시글을 업로드 하는 루틴
const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), uploadPost);

module.exports = router;