const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');


const app = express();


mongoose.connect('mongodb://user:user@aircnc-shard-00-00-xbx5y.mongodb.net:27017,aircnc-shard-00-01-xbx5y.mongodb.net:27017,aircnc-shard-00-02-xbx5y.mongodb.net:27017/aircnc?ssl=true&replicaSet=aircnc-shard-0&authSource=admin&retryWrites=true&w=majority', {
 useNewUrlParser:true,
 useUnifiedTopology:true
});

app.use(express.json());

app.use(routes);

app.listen(3000);