#!/usr/bin/env node
/**
 * analyze-css entry point
 *
 * @see https://github.com/macbre/analyze-css
 */
var analyzer = require('./../lib/index'),
	runner = require('./../lib/runner'),
	program = require('optimist'),
	cssString = '',
	argv = {},
	url = '';

// parse options
program
	.usage('analyze-css --url <url> [options]')

	// mandatory
	.describe('url', 'Set URL of CSS to analyze').string('url')
	.describe('file', 'Set local CSS file to analyze').string('file')

	// version / help
	.describe('version', 'Show version number and quit').boolean('version').alias('version', 'V')
	.describe('help', 'This help text').boolean('help').alias('help', 'h');

// parse it
argv = program.parse(process.argv);

// show version number
if (argv.version === true) {
	console.log('analyze-css v%s', analyzer.version);
	process.exit(0);
}

// show help
if (argv.help === true) {
	program.showHelp();
	process.exit(0);
}

// either --url of --file needs to be provided
if (typeof argv.url !== 'string' && typeof argv.file !== 'string') {
	program.showHelp();
	process.exit(255);
}

// run the analyzer
url = argv.url || argv.file;

runner(url, function(err, res) {
	if (err) {
		console.error(err);
		process.exit(255);
	}

	console.log(JSON.stringify(res));
	process.exit(0);
});
