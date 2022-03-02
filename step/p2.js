
const express = require('express');
const request = require('request');
const app = express();
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
    //? url : https://www.game-state.com/index.php?game=mta&location=TH สำหรับ setver thai
    const location = "TH"
    const url = `https://www.game-state.com/index.php?game=mta&location=${location}`;
    request(url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            res.send(html)
        }
    });
});
app.listen(port, () => { console.log(`listening on ${port}`); });
module.exports = app;
