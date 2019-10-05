const express = require("express");

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('api');
});


module.exports = routes;
