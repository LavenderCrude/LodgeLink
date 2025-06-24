import express from 'express';
import cookieParser from 'cookie-parser';

const app = express();
const port = 3000;

app.use(cookieParser('anyString'));

app.get('/', (req, res) => {
  res.send('working ');
  console.dir(req.cookies);
});

app.get('/cookie', (req, res) => {
  res.cookie('Name', 'Virat');
  res.cookie('Score', 700);
  res.send('Cookie Page');
});

app.get('/greet', (req, res) => {
  let { Name = 'Akhil' } = req.cookies;
  res.send('Hi, i am ' + Name);
});

app.get('/getSignCookie', (req, res) => {
  res.cookie('color', 'red', { signed: true });
  res.send('SignIn Request Send');
});

app.get('/verify', (req, res) => {
  console.log(req.signedCookies);
  res.send('verified');
});

app.listen(port, '0.0.0.0', () => {
  console.log('working on ' + port);
});
