/* jshint node:true, browser:false */
/* global require */
;(function(module) {
	'use strict';

	require('colors');

	module.exports = function(app, logger) {
		if(typeof logger === 'undefined' && typeof console !== 'undefined') {
			logger = console;
		}

		var log = (function(l) {
			if(typeof l.info === 'function') {
				return l.info;
			} else if(typeof l.log === 'function') {
				return l.log;
			} else {
				throw new Error("I can't figure out how to log to that logger!");
			}
		})(logger);

		var printRoutes = function(rts) {
			if(rts instanceof Array) {
				rts.forEach(function(r) {
					if(typeof r.path === 'string') {
						log('  ' + r.method.toUpperCase().green + ' ' + r.path.cyan);
					} else {
						log('  ' + r.method.toUpperCase().green + ' ' + r.path.toString().yellow);
					}
				});
			}
		};

		log('ExpressJS routes (' + 'strings'.cyan + ' ' + 'regexes'.yellow + ')');

		if(app.routes) {
			var r = app.routes;
			([r.get, r.post, r.put, r['delete'], r.head, r.options, r.trace]).forEach(printRoutes);
		} else if(app._router && app._router.stack) {
			app._router.stack
				.filter(function(r) { return r.route && r.route.path && r.route.methods; })
				.forEach(function(r) {
					printRoutes(Object.keys(r.route.methods).map(function(method) {
						return {
							method: method,
							path: r.route.path
						};
					}));
				});
		} else {
			log('Your app doesn\'t look familiar to me, I cannot print its routes.');
		}
	};
})(module);
