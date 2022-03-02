
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    res.send("Welcome")
});
app.listen(port, () => { console.log(`listening on ${port}`); });
module.exports = app;
