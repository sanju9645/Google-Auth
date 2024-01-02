# Google-Auth
Google Auth | NodeJS | Express | MongoDB

1. Initialize a New Project:

  Run npm init -y to skip all questions.

2. Install all dependencies
npm i bcrypt cors google-auth-library connect-mongo cookie-parser dotenv ejs express express-ejs-layouts express-session passport passport-google-oauth20 jsonwebtoken mongoose

3. Install developer depencies - these dependencies will be visible on the package.json
npm i nodemon --save-dev
npm i -D nodemon

4. Create .env file

5. Create a .gitignore file
  add the following contents
  
  node_modules/
  .env

6. Update Package.json Scripts:
  Modify the "scripts" section in package.json to include start and dev commands.

"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "start": "app.js",
  "dev": "nodemon app.js"
}


7. Setup app.js File:

Create the main app.js file in the project directory.

8. Google Developer Console:

Go to the Google Developer Console (https://developers.google.com/identity/sign-in/web/sign-in).
Create OAuth 2.0 credentials with the redirect URI set to 'http://localhost:3000/auth/google/callback'.

9. Store the client id and secret on .env file

10. Passport Configuration:

Follow Passport.js documentation (https://www.passportjs.org/packages/passport-google-oauth20/) to configure Google OAuth strategy.

Goto https://www.passportjs.org/packages/

11. Create new auth file, auth.js
  require('dotenv').config();

  const passport = require('passport');
  const { use } = require('../QuirkPost/server/routes/main');

  const GoogleStrategy = require('passport-google-oauth20').Strategy;

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_AUTH_CLIENT_ID,
      clientSecret: process.env.GOOGLE_AUTH_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
      done(null, profile);
    }
  ));

  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

12. require auth.js in app.js
require('./auth');

13. Create the auth callback endpoint
http://localhost:3000/auth/google/callback


14. https://www.youtube.com/watch?v=eDf91hihLpo



