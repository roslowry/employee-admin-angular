const express = require('express');
const app = express();
const morgan = require('morgan');
const path = require('path');
// The process.env would be applicable for deploying to heroku or other deployment site
const port = process.env.port || 8080;
const bodyParser = require('body-parser');
const apiRouter = require('./api');
const db = require('./db');


db.sync()
.then(() => {
  app.listen(port, function(){
    console.log(`Application is running on port ${port}`)
  })
})

app.use(morgan('dev'));
//
// app.use('/bootstrap', function(){console.log('bootstrap')})
// app.use('/angular', function(){console.log('angular')})
// app.use('/jquery', function(){console.log('jquery')}



app.use('/bootstrap', express.static(path.join(__dirname, '../node_modules/bootstrap/dist')));
app.use('/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist')));
app.use('/angular', express.static(path.join(__dirname, '../node_modules/angular')));
app.use(express.static(path.join(__dirname, '../client' )));



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

module.exports = app;
