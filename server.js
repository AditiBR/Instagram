const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

//DB Config
const dbConnectionString = require('./config/keys').mongoURI;

const expressApp = express();

//Body parser middleware.. express is the one getting data. urlencoded - textbox might have some characters
// extended - you can come up with your own encoding
expressApp.use(bodyParser.urlencoded({extended: false}));
expressApp.use(bodyParser.json());

expressApp.use('/api/users', users);
expressApp.use('/api/profile', profile);
expressApp.use('/api/posts', posts);


//Connect to MongoDB
mongoose.connect(dbConnectionString)
  .then(() => console.log('MongoDB Connected!'))
  .catch(err => console.log(err));



//Configure port to run web app
const port=8080;
expressApp.listen(port, () => console.log(`Server running on port ${port}`));
