import express, { Application, Request, Response } from "express";
import morgan from "morgan";
import "./database/connection";

import UserRouter from "./router/user-module/users";

import swaggerDocs from "./utils/swagger";
import AuthRouter from "./router/user-module/auth";
import passport from 'passport';
import session from 'express-session';
import cors from 'cors';


const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());

app.use(express.json());
// app.use(morgan("tiny"));
// app.use(express.static("public"));

app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
}));



app.use(passport.initialize());

passport.serializeUser((user: any, done: Function) => {
  done(null, user);
});

passport.deserializeUser((user: any, done: Function) => {
  done(null, user);
});

app.use(UserRouter);
app.use(AuthRouter);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
  swaggerDocs(app,PORT as unknown as string);

});
