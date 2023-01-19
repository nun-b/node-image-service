import { Router } from 'express'
import { isLoggedIn, isNotLoggedIn } from './middleware/status-login';
import { MainPage, JoinPage, ProfilePage, HashtagPage } from './controllers/index.control';

const router = Router();

router.get('^/$|index(.html)?', MainPage);
// 로그인 안한 사람만, 회원가입 할수 있도록 한다.
router.get('/join', isNotLoggedIn, JoinPage);
// 로그인 한 사람만, 프로파일을 보여 준다.
router.get('/profile', isLoggedIn, ProfilePage);
// 헤시태그 찾기 -> hashtag?hashtag=고양이
router.get('/hashtag', HashtagPage);

export default router;