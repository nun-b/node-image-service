const express = require('express');

const { isLoggedIn } = require('../function/login-status');
const { follow } = require('../controllers/user');

const router = express.Router();

// POST /user/:id/follow
router.post('/:id/follow', isLoggedIn, follow);

module.exports = router;