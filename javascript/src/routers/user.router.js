const express = require('express');

const { isLoggedIn } = require('./middleware/login-status');
const { follow } = require('./controllers/user.control');

const router = express.Router();

// POST /user/:id/follow
router.post('/:id/follow', isLoggedIn, follow);

module.exports = router;