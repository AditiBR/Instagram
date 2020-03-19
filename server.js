const express = require('express');
const expressApp = express();

expressApp.get('/', (req,res) => {
    res.send('Hi');
})

//Configure port to run web app
const port=8080;
expressApp.listen(port, () => console.log(`Server running on port ${port}`));
