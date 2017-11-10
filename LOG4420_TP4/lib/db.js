"use strict";

var config = require('../config');

var mongoose = require("mongoose");

mongoose.Promise = global.Promise;

mongoose.connect(config.database, { useMongoClient: true });
var db = mongoose.connection;
