import express, { Request, Response } from 'express';
import UserController from '../../controller/user-module/users-controller';
import passport from 'passport';
import { Strategy as GoogleStrategy, Profile } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import CryptoJS from 'crypto-js';
import AuthController from '../../controller/auth.controller';
import { isUndefined } from 'lodash';

const AuthRouter = express.Router();

const controller = new AuthController();



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

    const email = profile.emails?.[0]?.value as string;


    if(!isUndefined(profile)){
        
        controller.newAccountProfile({
					user_id: profile.id,
					displayName: profile.displayName,
					email: email,
					photo: '',
		});

         return done(null, userData);

    }


   
}));


passport.use(
	new FacebookStrategy(
		{
			clientID: '265183746608421',
			clientSecret: 'd58a2c0d7f8ca2f636911d11cf3dd479',
			callbackURL: 'http://localhost:8000/auth/facebook/callback',
			profileFields: ['id', 'displayName', 'emails', 'photos'],
		},
		(accessToken, refreshToken, profile, done) => {

             const picture = `https://graph.facebook.com/me/picture?access_token=${accessToken}&&redirect=false`;

			const userData = {
				profile: profile,
				accessToken: accessToken
			};
			
            const email = profile.emails?.[0]?.value as string;

		if (!isUndefined(profile)) {
			controller.newAccountProfile({
				user_id: profile.id,
				displayName: profile.displayName,
				email: email,
				photo: '',
			});

			return done(null, userData);
		}
		},
	),
);


AuthRouter.get('/session',async(req:Request & {session:any},res:Response)=>{
	const userList = {
		user_id: 'user1',
		displayName: 'John Doe',
		email: 'john@example.com',
		photo: 'https://example.com/john.jpg',
		createdAt: new Date(),
		updatedAt: new Date(),
	};


    // delete session 
    // delete req.session.userList;

    // modify session
    //   req.session.userList.displayName = 'Modified Name';

    req.session.userList = userList;

	if (req.session && req.session.userList) {
		// User is logged in, proceed to the next middleware or route handler
		res.json(req.session);
	} else {
		// User is not logged in, redirect to login page or send an error response
		res.status(401).send('Unauthorized');
	}
})


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