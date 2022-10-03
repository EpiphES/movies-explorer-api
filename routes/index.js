const express = require('express');

const router = express.Router();

const userRouter = require('./users');
const movieRouter = require('./movies');
const {
  login, createUser, logout,
} = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signInValidation, signUpValidation } = require('../middlewares/validation');
const { NotFoundError } = require('../errors');
const { pageNotFoundMessage } = require('../utils/constants');

router.post('/signup', signUpValidation, createUser);
router.post('/signin', signInValidation, login);

router.use(auth);

router.use('/users', userRouter);
router.use('/movies', movieRouter);
router.get('/signout', logout);
router.use((req, res, next) => {
  next(new NotFoundError(pageNotFoundMessage));
});

module.exports = router;
