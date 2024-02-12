import express, { Request, Response } from 'express';
import UserController from '../../controller/user-module/users-controller';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import CryptoJS from 'crypto-js';

const AuthRouter = express.Router();

const controller = new UserController();



passport.use(new GoogleStrategy({
    clientID: '694252038971-43vhcrl15kuucfq39bqimatuv9loa5bp.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'http://localhost:8000/auth/google/callback'
}, (accessToken: string, refreshToken: string, profile: Profile, done: Function) => {
    // You can access user profile information here
    const userData = {
        profile: profile,
        accessToken: accessToken
    };
    console.log('User profile:', userData);

    return done(null, userData);
}));


passport.use(new FacebookStrategy({
    clientID: '265183746608421',
    clientSecret: 'd58a2c0d7f8ca2f636911d11cf3dd479',
    callbackURL: 'http://localhost:8000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'email']
}, (accessToken, refreshToken, profile, done) => {
    const userData = {
        profile: profile,
        accessToken: accessToken
    };
    // console.log('User profile:', userData);

    return done(null, userData);
}));



AuthRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

AuthRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), (req, res) => {
 
    const userProfile = req.user;

    const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(userProfile), 'authenticate').toString();

    const encData = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(encryptedUser)
      );

    res.redirect(`http://localhost:3000?qs=${encData}`); 
  
});

AuthRouter.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));

AuthRouter.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    const userProfile = req.user;

    const encryptedUser = CryptoJS.AES.encrypt(JSON.stringify(userProfile), 'authenticate').toString();

    const encData = CryptoJS.enc.Base64.stringify(
        CryptoJS.enc.Utf8.parse(encryptedUser)
      );
    res.redirect(`http://localhost:3000?qs=${encData}`); 
});






export default AuthRouter;