const helpers = {};

helpers.isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  req.flash('error_msg', 'No estas Logeado o no tienes la autorizacion a esta tarea');
  res.redirect('/users/inicio');
};

module.exports = helpers;