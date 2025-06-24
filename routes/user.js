import express from 'express';
import passport from 'passport';
import wrapAsync from '../utils/wrapAsync.js';
import { saveRedirectUrl } from '../middlewares/isLoggedIn.js';
import * as userController from '../controllers/users.js';

const router = express.Router();

router
  .route('/signup')
  .get(userController.renderSignupForm)
  .post(wrapAsync(userController.signup));

router
  .route('/login')
  .get(userController.renderLoginForm)
  .post(
    saveRedirectUrl,
    passport.authenticate('local', {
      failureRedirect: '/login',
      failureFlash: true,
    }),
    userController.login
  );

router.get('/logout', userController.logout);

export default router;
