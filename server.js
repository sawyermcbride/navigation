const express = require('express');
const port = 4000;
const path = require('path');
const csv = require('csv-parser');
const fs = require('fs');
const AppClass = require(__dirname+'/app.js');
const morgan = require('morgan');
const MapRouter = require(path.join(__dirname, '/routes/navigation.js'));

const app = express();

const NavigatorApp = AppClass.getInstance();

console.log(NavigatorApp);
NavigatorApp.intitialize().then(() => {
  console.log(NavigatorApp.intitialized);
  console.log(NavigatorApp.route("San Francisco", "Los Angeles"));
}, (err) => {
    console.log(err)
})

app.use(morgan('combined'));


app.get('/', (req, res) => {
  res.send('<h1>Navigation Application</h1>');
})

app.use('/map', MapRouter);

app.use(express.static('public'));


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


        
