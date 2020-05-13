const userCtrl = {};

const passport = require('passport');

const User = require('../models/Users');

userCtrl.renderRegistroForm = (req, res) => {  //renderiza un formulario
    res.render('users/registro');
};

userCtrl.registro = async (req, res) => { //aca se registra
    const errors = [];
    const { name, email, password, confirm_password } = req.body;
    if (password != confirm_password) {
        errors.push({ text: 'Contraseñas no coinciden' });
      }    
    if (password.length < 4) {
        errors.push({ text: 'La contraseña debe obtener almenos 4 caracteres' });
      }
    if (errors.length > 0) {
        res.render('users/registro', {errors, name, email})

    } else {
        // Look for email coincidence
        const emailUser = await User.findOne({ email: email });
        if (emailUser) {
          req.flash('error_msg', "El e-mail esta en uso, intente con otro");
          res.redirect("/users/registro");
        } else {
            console.log(req.body);
          // Saving a New User
          const newUser = new User({ name, email, password: password });
          newUser.password = await newUser.encryptpassword( password );
          await newUser.save();
          req.flash('success_msg' , "Felicidades, ya esta registrado!");
          res.redirect("/users/inicio");
        }
    }                       
    
};

userCtrl.iniciosesion = passport.authenticate( 'local', {
    failureRedirect: '/users/inicio',
    successRedirect: '/allproducts',
    failureFlash: true,

});

userCtrl.iniciosesionForm = (req, res) => {  //inicarsecion form
    res.render('users/singin');
};

userCtrl.cerrarsession = (req, res) => {  //aca se cierra
    req.logout();
    req.flash('success_msg', 'Session finalizada con exito');
    res.redirect('/users/inicio')
};


module.exports = userCtrl;