import express from 'express';
import session from 'express-session';
import flash from 'connect-flash';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const port = 3000;
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const sessionOptions = {
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
};

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//express-session middleware
app.use(session(sessionOptions));
app.use(flash());

//sending req.locals for flash cards
app.use((req, res, next) => {
  res.locals.Successmsg = req.flash('success');
  res.locals.Errormsg = req.flash('error');
  next();
});

app.get('/register', (req, res) => {
  let { name = 'Ananomynus' } = req.query;
  req.session.name = name;
  if (name === 'Ananomynus') req.flash('error', 'User not Register');
  else req.flash('success', 'User Register');

  console.log(req.session.name);
  res.redirect('/hello');
});

app.get('/hello', (req, res) => {
  res.render('page.ejs', { name: req.session.name });
});

// app.get('/reqcount', (req, res) => {
//   req.session.count = 1;
//   res.send('No of req. are :' + req.session.count);
// });
app.listen(port, '0.0.0.0', () => {
  console.log('severs is running on ' + port);
});
