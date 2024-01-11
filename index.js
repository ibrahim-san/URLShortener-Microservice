require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const dns = require('dns');

// Basic Configuration
const port = process.env.PORT || 3000;

app.use(cors());

app.use('/public', express.static(`${process.cwd()}/public`));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

// Your first API endpoint
app.get('/api/hello', function(req, res) {
  res.json({ greeting: 'hello API' });
});

// URL shortener microservice
let parsedURL = "";

app.get('/api/shorturl/1', (req, res) => {
  if (parsedURL != "") {res.redirect(parsedURL)}
});

app.post('/api/shorturl', (req, res) => {

  try {    
    
    parsedURL = new URL(req.body.url);
    let hostname = parsedURL.hostname;
    dns.lookup(hostname, (err, address, family) => {   
      if (err) {
        res.json({ error: 'invalid url' }); 
      } else {
        res.json({"original_url": parsedURL,"short_url": 1})

        
      }    
    });
    
  } catch (error) {    
    
    res.json({ error: 'invalid url' });    
    
  }
 
});

app.listen(port, function() {
  console.log(`Listening on port ${port}`);
});
