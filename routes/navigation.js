const express = require('express');
const path = require('path');
const AppClass = require(path.join(__dirname, '../app.js'));

const map = express.Router();
const NavigatorApp = AppClass.getInstance();

map.get('/',(req, res, next) => {
    res.send("homepage");
})

map.get('/route/:start/:end', (req, res) => {
    let start_location = req.params.start.replace("-", " ");
    let end_location = req.params.end.replace("-", " ");
    console.log(start_location);
    console.log(end_location)

    let directions = NavigatorApp.route(start_location, end_location);

    if(!directions) {
        res.send("No route found");
    }

    res.status(200).json(directions);       

})



module.exports = map;
