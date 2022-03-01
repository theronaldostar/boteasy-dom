"use strict";

if (process.env.NODE_ENV === "production") {
	module.exports = require("./scripts/development.js");
} else {
	module.exports = require("./scripts/development.js");
};
