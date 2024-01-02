require('dotenv').config();

const express = require('express');
// const expressLayout = require('express-ejs-layouts');
const path = require('path');
const passport = require('passport');
const session = require('express-session');
require('./auth');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static('public'));

// Templating engine
// app.use(expressLayout);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

const isLoggedIn = (req, res, next) => {
  req.user ? next() : res.sendStatus(401);
}

app.use('/assests', express.static('assets'));
app.use(session({
  secret: process.env.EXPRESS_SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { 
    maxAge: 3600000,
    secure: false 
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.render('index', {});
});

app.get('login/', (req, res) => {
  res.render('login', {});
});

app.get('/auth/google',
  passport.authenticate('google', { 
    scope: ['email', 'profile'] 
  })
);

app.get('/auth/google/callback', 
  passport.authenticate('google', { 
    successRedirect: '/auth/protected',
    failureRedirect: '/login' 
  })
);

app.get('/auth/protected', isLoggedIn, (req, res) => {
  let name = req.user.displayName;
  let email = req.user.emails[0].value;
  res.send(`Hello ${name} ${email}`);
});

app.get('/auth/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
})

app.listen(PORT, () => {
  console.log(`APP listening on port ${PORT}`);
});
