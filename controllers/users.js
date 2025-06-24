import User from '../models/user.js';

export const renderSignupForm = (req, res) => {
  res.render('users/signUp.ejs');
};

export const signup = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);

    //automatically send to main page after signUp
    req.login(registeredUser, (err) => {
      if (err) return next(err);
      req.flash('success', 'Welcome to LodegeLink');
      res.redirect('/listing');
    });
  } catch (error) {
    req.flash('error', error.message);
    res.redirect('/signup');
  }
};

export const renderLoginForm = (req, res) => {
  res.render('users/login.ejs');
};

export const login = (req, res) => {
  req.flash('success', 'Welcome Back!!');
  const redirectUrl = res.locals.redirectUrl || '/listing';
  res.redirect(redirectUrl);
};

export const logout = (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);
    req.flash('success', 'Logout Successfully');
    res.redirect('/listing');
  });
};
