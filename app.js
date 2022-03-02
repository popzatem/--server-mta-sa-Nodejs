
const express = require('express');
const request = require('request');
const xpath = require('xpath');
const dom = require('xmldom').DOMParser;
const app = express();
const port = process.env.PORT || 3000;

app.get('/', function (req, res) {
  //? url : https://www.game-state.com/index.php?game=mta&location=TH สำหรับ setver thai
  const location = "TH"
  const url = `https://www.game-state.com/index.php?game=mta&location=${location}`;
  var xpath_ = '//x:td[@class="hostname"]/x:a/text()';
  var xpath_2 = '//x:td[@class="players"]/text()';
  var xpath_3 = '//x:td[7]/text()';
  request(url, function (error, response, html) {
    if (!error && response.statusCode == 200) {
      var doc = new dom().parseFromString(html);
      var select = xpath.useNamespaces({ "x": "http://www.w3.org/1999/xhtml" });
      var node = select(xpath_, doc);
      var node2 = select(xpath_2, doc);
      var node3 = select(xpath_3, doc);
      var data = [];
      for (let x = 0; x < node.length; x++) {
        try {
          let base = node[x + 1].nodeValue.trim();
          let base_player = node2[x].nodeValue.trim();
          let ip = node3[x].nodeValue.trim();
          data.push({ 'name': base, 'player': base_player, 'ip': ip });

        } catch (error) {
        }
      }
      res.status(200).json(data);
    }
  });
});
app.listen(port, () => { console.log(`listening on ${port}`); });
module.exports = app;
