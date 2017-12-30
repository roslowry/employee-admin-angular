const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
// The process.env would be applicable for deploying to heroku or other deployment site
const port = process.env.port || 3000;
const bodyParser = require('body-parser');
const apiRouter = require('./api');
const db = require('./db');

// create server

db.sync()
.then(() => {
  app.listen(port, function(){
    console.log(`Application is running on port ${port}`)
  })
})

app.use(morgan('dev'))

app.use(express.static(path.join(__dirname, '../public' )))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', apiRouter);

app.get('*', function(req, res) {
  res.sendfile(path.join(__dirname,'../index.html'))
})

app.use(function(err, req, res, next){
  console.error(err);
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || 'Internal server error')
})
