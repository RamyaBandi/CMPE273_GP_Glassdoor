const {
	RES_SUCCESS,
	RES_INTERNAL_SERVER_ERROR,
} = require("../config/routeConstants");


var kafka = require('../kafka/client');

module.exports.createCompanyProfile = (req, res) => {
	console.log("req.body" + JSON.stringify(req.body))
	data = {
		api: "POST_COMPANY_SIGNUP",
		body: req.body
	}
	kafka.make_request('company', data, function (err, results) {
		console.log('in result');
		console.log(results);
		if (err) {
			console.log("In error");
			res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
		} else {
			console.log("In else");
			res.status(RES_SUCCESS).send(JSON.stringify(results));
		}

	});
}

module.exports.updateCompanyProfile = (req, res) => {
	console.log("req.body" + JSON.stringify(req.body))
	data = {
		api: "PUT_COMPANY_SIGNUP",
		body: req.body
	}
	kafka.make_request('company', data, function (err, results) {
		console.log('in result');
		console.log(results);
		if (err) {
			console.log("In error");
			res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
		} else {
			console.log("In else");
			res.status(RES_SUCCESS).send(JSON.stringify(results));
		}

	});
}


module.exports.getCompanyProfile = (req, res) => {
	console.log("req.query" + JSON.stringify(req.query))
	data = {
		api: "GET_COMPANY_DETAILS",
		body: req.query
	}
	kafka.make_request('company', data, function (err, results) {
		console.log('in result');
		console.log(results);
		if (err) {
			console.log("In error");
			res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
		} else {
			console.log("In else");
			res.status(RES_SUCCESS).send(JSON.stringify(results));
		}

	});
}



module.exports.getUpdatedCompanyProfile = (req, res) => {
	console.log("req.query" + JSON.stringify(req.query))
	data = {
		api: "GET_COMPANY_SIGNUP",
		body: req.query
	}
	kafka.make_request('company', data, function (err, results) {
		console.log('in result');
		console.log(results);
		if (err) {
			console.log("In error");
			res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
		} else {
			console.log("In else");
			res.status(RES_SUCCESS).send(JSON.stringify(results));
		}

	});
}



module.exports.postCompanyView = (req, res) => {
	console.log("req.body" + JSON.stringify(req.body))
	data = {
		api: "POST_COMPANYVIEWS",
		body: req.body
	}
	kafka.make_request('company', data, function (err, results) {
		console.log('in result');
		console.log(results);
		if (err) {
			console.log("In error");
			res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
		} else {
			console.log("In else");
			res.status(RES_SUCCESS).send(JSON.stringify(results));
		}

	});
}

module.exports.updateCompanyFeatured = (req, res) => {
	console.log("req.body" + JSON.stringify(req.body))
	data = {
		api: "PUT_FEATURED_REVIEWS",
		body: req.body
	}
	kafka.make_request('company', data, function (err, results) {
		console.log('in result');
		console.log(results);
		if (err) {
			console.log("In error");
			res.status(RES_INTERNAL_SERVER_ERROR).end(JSON.stringify(err));
		} else {
			console.log("In else");
			res.status(RES_SUCCESS).send(JSON.stringify(results));
		}

	});
}



