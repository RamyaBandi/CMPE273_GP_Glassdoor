const {
    CONTENT_TYPE,
    APP_JSON,
    RES_SUCCESS,
    RES_BAD_REQUEST,
    RES_NOT_FOUND,
    RES_DUPLICATE_RESOURCE,
    TEXT_PLAIN,
    RES_INTERNAL_SERVER_ERROR,
    REVIEW_ROUTE,
    POST_STUDENT_REVIEW,
    GET_STUDENT_REVIEWS,
    GET_ALL_REVIEWS,
    GET_COMPANY_REVIEWS,
    POST_COMPANY_REPLY,
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



  function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}

module.exports.postCompanyView = (req, res) => {
    let date = Date()
    console.log("Date", date)
    console.log("Date after formatting", formatDate(date))
    console.log("Inside Company Profile POST views");
    console.log("req body" + JSON.stringify(req.body));
    let data = req.body
    data={
      api:"POST_COMPANYVIEWS",
      companyId : req.body.companyId,
      companyName: req.body.companyName,
      Date : formatDate(date)
    }
    kafka.make_request('company', data, function(err,results){
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

