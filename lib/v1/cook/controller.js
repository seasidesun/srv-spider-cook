"use strict";

var error_handler = require('../../utils/error_handler');
var duoguoControl = require('./douguo/controller');
var meishijControl = require('./meishij/controller');
var zgcaipuControl = require('./zgcaipu/controller');
var manager = require('./manager');
var async = require('async');

var webManager = {
	"duoguoManager": require('./douguo/manager'),
	"meishijManager": require('./meishij/manager'),
	"zgcaipuManager": require('./zgcaipu/manager')
};

// // douguo
async.parallel(
	[
		function (callback) {duoguoControl.getSeeds(callback);},
		function (callback) {duoguoControl.getAnaly(callback);}
	],
	function (err) {
		if (err) {
			error_handler.logError(err);
			return;
		}
		setTimeout(duoguoControl.startSpiderUrl, 1000);
		setTimeout(duoguoControl.startAnalyUrl, 2000);
		setTimeout(duoguoControl.saveRecipes, 0);
		setTimeout(duoguoControl.saveSeeds, 0);
		setTimeout(duoguoControl.saveAnaly, 0);
		setTimeout(duoguoControl.showMessage, 0);
	}
);

// zgcaipu
async.parallel(
	[
		function (callback) {zgcaipuControl.getSeeds(callback);},
		function (callback) {zgcaipuControl.getAnaly(callback);}
	],
	function (err) {
		if (err) {
			error_handler.logError(err);
			return;
		}
		setTimeout(zgcaipuControl.startSpiderUrl, 1500);
		setTimeout(zgcaipuControl.startAnalyUrl, 2500);
		setTimeout(zgcaipuControl.saveRecipes, 1000);
		setTimeout(zgcaipuControl.saveSeeds, 1000);
		setTimeout(zgcaipuControl.saveAnaly, 1000);
		setTimeout(zgcaipuControl.showMessage, 1000);
	}
);

// // meishij
// async.parallel(
// 	[
// 		function (callback) {meishijControl.getSeeds(callback);},
// 		function (callback) {meishijControl.getAnaly(callback);}
// 	],
// 	function (err) {
// 		if (err) {
// 			error_handler.logError(err);
// 			return;
// 		}
// 		setTimeout(meishijControl.startSpiderUrl, 2000);
// 		setTimeout(meishijControl.startAnalyUrl, 3000);
// 		setTimeout(meishijControl.saveRecipes, 2000);
// 		setTimeout(meishijControl.saveSeeds, 2000);
// 		setTimeout(meishijControl.saveAnaly, 2000);
// 		setTimeout(meishijControl.showMessage, 2000);
// 	}
// );

module.exports.saveData = function (req, res, next) 
{
	console.log("save all data");
	for(var i in webManager){
		webManager[i].saveAnaly(function () {});
		webManager[i].saveSeeds(function () {});
		webManager[i].saveRecipes();
	}
	res.json({itme: "ok"});
};


