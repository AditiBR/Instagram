const express = require('express');
const users = require('./routes/api/users');
const profile = require('./routes/api/profile');
const posts = require('./routes/api/posts');

const expressApp = express();

expressApp.use('/api/users', users);
expressApp.use('/api/profile', profile);
expressApp.use('/api/posts', posts);

//Configure port to run web app
const port=8080;
expressApp.listen(port, () => console.log(`Server running on port ${port}`));
