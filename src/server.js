const express = require('express');
const path = require('path');
const exphbs = require('express-handlebars');
const multer = require('multer');
const morgan = require('morgan');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const methodOverride = require('method-override');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const Handlebars = require('handlebars');



//inicializaciones
const app = express();

require('./config/passport');

//static files
app.use(express.static(path.join(__dirname, 'public')));

//settings
app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views') );
app.engine('.hbs', exphbs({
    defaultLayout:'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs',
    handlebars : allowInsecurePrototypeAccess(Handlebars),
}));
app.set('view engine', '.hbs');

//midlewares
app.use(morgan('dev'));

app.use(express.urlencoded({extended:false}));

app.use(flash());

app.use(methodOverride('_method'));
app.use(session({
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
}));

const storage = multer.diskStorage({
    destination: path.join(__dirname,'public/uploads'),
    filename(req, file, cb) {
      cb(null, new Date().getTime() + path.extname(file.originalname));
    }
  });

app.use(multer({storage}).single('image')); //imput de tipo file parametro image

app.use(passport.initialize());
app.use(passport.session());

//global variables

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;

    next();
});

//routes
app.use(require('./routes/index.routes'));
app.use(require('./routes/products.routes'));
app.use(require('./routes/users.routes'));

module.exports = app;
