'use strict';

const packageJson = require('./package.json'),
    host = require('os').hostname(),
    express = require('express'),
    bodyParser = require('body-parser'),
    app = express(),
    processEnv = require('./api.js'),
    apiVersion = 1,
    port = 8080;

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '50mb',
}));

app.use(bodyParser.json({ limit: '50mb' }));
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Authorization, Origin, X-Requested-With, Content-Type, Accept');
    if (req.method.toLowerCase() === "options") res.send(200);
    else next();
});


app.get(`/ps`, (req, res) => {
  console.log(processEnv.getEnv())
  return res.send(processEnv.getEnv());
});

app.all('/*', (req, res) => {
    res.status(404);
    return res.send({ message: 'Invalid endpoint' });
});

app.listen(port);
console.log(`running on ${port}`);

module.exports = app;
