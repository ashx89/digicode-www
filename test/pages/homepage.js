/**
 * Homepage
 */
casper.test.begin('Digicode Homepage tests', 1, function(test) {
	casper.start('index.html', function () {
		test.assertTitle('Digicode Ltd.', 'homepage title has been set');
	}).run(function () {
		test.done();
	});
});