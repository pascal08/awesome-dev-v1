# About

This repo consist of 3 connected services, sharing code via the shared directory. It consists the following:

- API server
- Socket server
- Mail server

## General information about Config
The configuration of these services are handled by the beautiful [npm config package](https://www.npmjs.com/package/config). In short, don't touch default.js, use development.js. If you don't want to modify the config of the repo, create a local.js configuration file. The production.js file is meant for - you guessed it - the production environment. For more information about how to properly manage the configuration, [please check the docs](https://www.npmjs.com/package/config).

### Important config settings
Set the database:

`mongodb.database = "mongodb://127.0.0.1:27017/proto-skeleton"
`


Set a secret key (used for signing the JWT):

`security.secret = "randomstringofcharacters"`


---------------------

## API server

The api server is REST based with JSON webtokens for authentication and is build with Express. It has 3 different ways to authenticate with it on default and is easily exendable by adding more [Passport](http://passportjs.org/docs) strategies. These 3 strategies (local, Facebook & Google) are configureable by the config (more on config within the config section).

The API server has middleware for checking if the user is authenticated (isAuthorized), if the authenticated userId equals the resource userId (isSelf). And a few paths pre-defined, required for authentication.

Run the api server by calling the following command
```
node . api-server
```

### Configuration

See the **config/default.js** section for most of the settings value (specifically within the ["api-server"]) part. The api-server also use values from the "security" & "mongodb" sections.

For setting up [Facebook](https://developers.facebook.com/docs/apps/register#developer-account) & [Google](https://console.developers.google.com/apis/credentials/oauthclient) authentication parameters you will need to add the following within the "security" section.

```
facebook: {
    clientID: "",
    clientSecret: "",
    callbackURL: "http://localhost:3000/auth/facebook/callback" // Or other domain where API server is deployed
},
google: {
    clientID: "",
    clientSecret: "",
    callbackURL: "http://localhost:3000/auth/google/callback" // Or other domain where API server is deployed
}
```
To specify a custom redirect url, you will need to specify it as a query parameter `/auth/facebook?redirectUrl=http://web.application.io` (this applies for `/auth/google` as well)

------------------
## Socket server

Pretty basic at the moment, the sockets implementation runs on top of Sockets.io. It has support for defining routes like you can do with Express so it supports [Connect](https://github.com/senchalabs/connect#readme)-style middleware as well.

------------------
## Mail server

The mail server is a Nodemailer based service which continuously processes the mailing queue. This queue is stored in the Mongodb database within 'mailingQueu'. You can push e-mails to this queu by using Mail.add(mailObject), where mailObject is an object as specified in the `data-models/email.json`

### Configure SMTP

You will need to configure the smtp connection to be able to send mails. The easiest and most straightforward way of doing so is [described on the website of nodemon](https://nodemailer.com/smtp/).
This string you will then add to the configuration as followed:

```
{
    ['mail-server']: {
        smtp: "smtps://user%40gmail.com:pass@smtp.gmail.com/?pool=true"
    }
}
```

------------------


# Roadmap
- Api server
    - Add password reset functionality
    - Add proper CORS support/configuration settings
- Socket server
    - Further improvement of Connect implementation
- Mail server
    - Add structure for storing e-mail templates
