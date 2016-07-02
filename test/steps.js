/**
 *
 */

module.exports.init = function() {
    var Yadda = require('yadda');
    var xp = function(path) { return { type: 'xpath', path: path }; };

    var web = {
        host: null,
        page: null // holds the currently open casper object
    };

    var dictionary = new Yadda.Dictionary()
        .define('SEARCHTERM', /([^"]*)/)
        .define('SIZE', /(\d+)px/)
        .define('DEVICE', /([1-4])/)
        .define('PATH', /(\/[a-zA-Z0-9\/.-]+)/)
        .define('TITLE', /([a-zA-Z -]+)/)
        .define('ENV', /([a-z-]+)/);

    var library = Yadda.localisation.English.library(dictionary)
        .when('I go to the page at "$PATH"', function(path) {
            web.page = casper.open(web.host + path);
        })

        .then('I should see "$TITLE" as the page title', function(title) {
        	console.log(web);
            web.page.test.assertTitle(title, 'Page title is ' + casper.getTitle());
        })

        ;

    return library;
};
