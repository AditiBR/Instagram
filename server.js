const express = require('express');
const users = require('./routes/api/users');

const expressApp = express();

expressApp.use('/api/users', users);

//Configure port to run web app
const port=8080;
expressApp.listen(port, () => console.log(`Server running on port ${port}`));
