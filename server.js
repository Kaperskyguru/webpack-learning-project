const express = require('express');
const app = express();
const path = require('path');

app.use('/assets', express.static(path.join(__dirname, '/dist/assets'), {
    maxAge: '30d'
}));
app.get('/', (req, res) => res.sendFile(path.join(__dirname + '/dist/index.html')));

const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));