export const isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    //save previous path before login
    req.session.redirectUrl = req.originalUrl;

    req.flash('error', 'you must login to make changes Listing');
    return res.redirect('/login');
  }
  next();
};

//saveRedirectUrl because req.session.redirectUrl delete after oneTime
export const saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};
