/* jshint node:true, browser:false */
/* global require */
;(function(module) {
	'use strict';

	require('colors');

	module.exports = function(app, logger) {
		var log = (function(l) {
			if(typeof l.info === 'function') {
				return l.info;
			} else if(typeof l.log === 'function') {
				return l.log;
			} else {
				console.log('Warning: unfamiliar logger encountered; using console.log'.red);
				return function(x) { console.log(x); };
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

		var r = app.routes;
		([r.get, r.post, r.put, r['delete'], r.head, r.options, r.trace]).forEach(printRoutes);
	};
})(module);
