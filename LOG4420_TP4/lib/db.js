"use strict";

var config = require('../config');

var mongoose = require("mongoose");
var Schema = mongoose.Schema;

mongoose.Promise = global.Promise;

mongoose.connect(config.database, { useMongoClient: true });
var db = mongoose.connection;
