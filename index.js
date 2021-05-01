var express = require('express');
var ParseDashboard = require('parse-dashboard');

let localParseServer = 'http://localhost:1337/parse';

var dashboard = new ParseDashboard({
    apps: [
        {
            appId: process.env.APP_ID || 'myAppId',
            masterKey: process.env.MASTER_KEY || 'myMasterKey',
            serverURL: process.env.SERVER_URL || localParseServer,
            appName: process.env.APP_NAME || 'MyApp',
            graphQLServerURL: process.env.GRAPHQL_URL
        },
    ],
    users: [
        { user: process.env.USERNAME, pass: process.env.PASSWORD }
    ],
    trustProxy: 1
});

var app = express();
app.enable('trust proxy');

// make the Parse Dashboard available at /
app.use('/', dashboard);

var port = process.env.PORT || 4040;
var httpServer = require('http').createServer(app);
httpServer.listen(port, function () {
    console.log('teleschedul-dashboard running on port ' + port + '.');
});