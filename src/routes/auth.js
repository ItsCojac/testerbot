const express = require('express');
const { body } = require('express-validator');
const { signUp, signIn } = require('../controllers/auth');
const { validateRequest } = require('../middleware/validate-request');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.post(
  '/signup',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be between 8 and 20 characters'),
  ],
  validateRequest,
  signUp
);

router.post('/signin', signIn);

router.get('/me', requireAuth, (req, res) => {
  res.status(200).send({ user: req.user });
});

module.exports = router;
