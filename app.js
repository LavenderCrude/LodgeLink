// 1. IMPORTS
import dotenv from 'dotenv';
if (process.env.NODE_ENV !== 'production') {
  dotenv.config();
}
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import methodOverride from 'method-override';
import ejsMate from 'ejs-mate';
import { fileURLToPath } from 'url';
import ExpressError from './utils/ExpressError.js';
import listingRouter from './routes/listing.js';
import reviewRouter from './routes/review.js';
import userRouter from './routes/user.js';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from './models/user.js';

// 2. DATABASE CONNECTION
const MONGO_URL = 'mongodb://127.0.0.1:27017/LodgeLink';

async function main() {
  await mongoose.connect(MONGO_URL);
}

main()
  .then(() => {
    console.log('✅ Connection Established');
  })
  .catch((err) => {
    console.log('❌ Connection Failed', err);
  });

// 3. APP INITIALIZATION
const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sessionOptions = {
  secret: 'secretCode',
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
  },
};

// 4. VIEW ENGINE SETUP
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// 5. GLOBAL MIDDLEWARE
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// 6. CUSTOM LOGGING MIDDLEWARE
// app.use('/', (req, res, next) => {
//   req.time = new Date(Date.now()).toString();
//   console.log(req.method, req.hostname, req.path, req.time);
//   next();
// });

// 7. ROUTES
// Home
app.get('/', (req, res) => {
  res.redirect('/listing');
});

//Session Middleware
app.use(session(sessionOptions));
app.use(flash());

//passport Middleware
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//locally define the variable for ejs use..
app.use((req, res, next) => {
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  res.locals.currUser = req.user;
  next();
});

app.use('/listing', listingRouter);
app.use('/listing/:id/reviews', reviewRouter);
app.use('/', userRouter);

// 8. 404 HANDLER
app.all('*', (req, res, next) => {
  next(new ExpressError(404, 'Page Not Found'));
});

// 9. ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  const { statusCode = 500, message = 'Something went wrong' } = err;
  console.error(err);

  // res.status(statusCode).send(message);
  res.status(statusCode).render('listings/error.ejs', { message });
});

// 10. START SERVER
app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
