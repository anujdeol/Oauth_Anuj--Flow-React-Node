const express = require('express');
const app = express();
const { auth } = require('express-oauth2-jwt-bearer');

const port = process.env.PORT || 8080;

const jwtCheck = auth({
  audience: 'https://www.mydemoapi.com',
  issuerBaseURL: 'https://dev-anuj-projects.us.auth0.com/',
  tokenSigningAlg: 'RS256'
});

// enforce on all endpoints
app.use(jwtCheck);

app.get('/mydemo', function (req, res) {
    res.json('Here the data from the secured API from oauth ');
});

app.listen(port);

console.log('Running on port ', port);