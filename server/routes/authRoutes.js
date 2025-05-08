const express = require('express')
const authController = require('../controllers/controllers')
// Fix: Import from correct path
const { registerValidator, loginValidator } = require('../validator/userValidator')
const router = express.Router();

router.post('/signup', registerValidator, authController.signup)
router.post('/signin', loginValidator, authController.signin)

module.exports = router;