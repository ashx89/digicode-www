var fs = require('fs');
var async = require('async');
var Yadda = require('yadda');

var parser = new Yadda.parsers.FeatureParser();
var tests = require('./steps').init();
var yadda = Yadda.createInstance(tests);

Yadda.plugins.casper(yadda, casper);

var features = (casper.cli.options['features'] || '');

console.log('cli features', features);

function runFeature(feature) {
	new Yadda.FeatureFileSearch(featuresDir + '/' + feature).each(function (file) {
		var featureText = fs.read(file, 'utf8');
		var feature = parser.parse(featureText);

		console.log('f', feature);
		console.log('ft', featureText);

		casper.test.begin(feature.title, function suite(test) {
			console.log('f', feature);
			console.log('fd', featuresDir);

			async.eachSeries(feature.scenarios, function (scenario, next) {
				casper.start();
				casper.test.info('## ' + scenario.title);
				if (scenario.annotations && scenario.annotations.todo) {
					casper.test.skip(1, 'Scenario is marked @todo');
					next();
				} else {
					casper.yadda(scenario.steps);
					casper.run(function () {
						next();
					});
				}
			})
		}, function(err) {
			casper.test.done();
		});
	});
}
