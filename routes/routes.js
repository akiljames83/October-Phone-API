var express 	= require("express"),
    bodyParser  = require("body-parser"),
    request	= require("request-promise"),
    router	= express.Router();


router.get("/:company", function(req, res) {

	var company_info = req.params.company;
	let query_params = company_info.split("&");

	var query = "https://www.google.com/search?q=paris+contact+info";
	const error_message = "Error: Number is not found in basic google search. Please add more information in query.";

	var siren = {
		exists: false,
		number: ""
	};

	// Build up the query
	query_params.forEach( param => {
		var clean_string = clean_params(param);
		var siren_in_param = get_siren(clean_string);

		if (siren_in_param !== null && siren_in_param[0].length === 9) {
			siren.exists = true;
			siren.number = siren_in_param[0];
			return;
		}
		query += `+${clean_string}`;
	});

	// Better search results if siren is at the end
	if (siren.exists) {
		query += `+${siren.number}`;
	}

	// Specify options for the request
	const options = {
		method: 'GET',
  		uri: query
	}

	// Make the request
	request(options)
	.then( data => {

		// Retrieve the phone number using regex
		var number = get_phone_number(data);

		console.log(`Siren exists: ${siren.exists}`);

		// If number is not found through google search request additional information
		if (!number || number.length == 0) {
			console.log(error_message);
		} else {
			var clean_number = replace_x_with(number[0], ' ', '');
			console.log(`Clean number: ${clean_number}\nSiren number: ${siren.number}`);
		}

		// Check to see if number found was siren number from in the query
		if (siren.exists && (clean_number === `${siren.number}` || clean_number === `+${siren.number}`)) {
			number = get_phone_number(replace_x_with(data, siren.number.substring(1), ''));
			if (!number || number.length == 0) {
				console.log(error_message);
			}
		} 

		// Create the json output object
		const response = {
			PHONE: (number && number.length && number[0].length > 4) ? number[0] : error_message
		}

		// Send pretty json object
		res.end(JSON.stringify(response, null, 3));
	});

});

/**
 * Generic function to perform substitution in a string using regex
 */
function replace_x_with(body, x, y) {
	var re = new RegExp(x, 'g');
	var temp = body;
	return temp.replace(re, y);
}

/**
 * Change query format from "-" seperated to "+" seperated for google.
 * @param  {string} param - Each argument that is passed into the url query
 * @return {string}       - Correctly formated string agument
 */
function clean_params(param) {
	var find = "-";
	var replace = '+';
	return replace_x_with(param, find, replace);
}

/**
 * Function to be used to find first phone number in the body of text scraped from the google webpage.
 * @param  {string} body - Body of text to be parsed
 * @return {array}     	 - Nullable array of each instance of match
 */
function get_phone_number(body) {
	var find = /\+3((\ )?([0-9]){1,2}(\ )?)+/;
	var re = new RegExp(find);
	return re.exec(body);
}

/**
 * Function to be used to find a siren number in query param
 * @param  {string} body - Body of text to be parsed
 * @return {array}     	 - Nullable array of each instance of match
 */
function get_siren(body) {
	// Read that SIREN codes can start with a 1 2 for public companies and 3 for the ones provided
	var find = /\+?(1|2|3)(([0-9]){1,2})+/;
	var re = new RegExp(find);
	return re.exec(body);
}

/**
 * Function to be used to find first link in the body of text scraped from the google webpage.
 * @param  {string} body - Body of text to be parsed
 * @return {array}     	 - Nullable array of each instance of match
 */
function get_url(body) {
	var find = /\/(url\?q=https:\/\/([0-9]*[a-z]*[A-Z]*(\.)*(\/)*)*)&/;
	var re = new RegExp(find);
	var res = re.exec(body);
	console.log(`url is ${res}`);
	return res;
}

module.exports = router;
