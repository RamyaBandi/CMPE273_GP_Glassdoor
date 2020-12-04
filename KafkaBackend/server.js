var connection = new require('./kafka/Connection');
//topics files
require('dotenv').config({ path: __dirname + '/.env' })
require('./config/mongoConnection');

const register = require('./services/registerServices')
const login = require('./services/loginServices')
const reviews=require('./services/reviewServices')
const company=require('./services/companyServices')
const jobshomepage = require('./services/jobsHomePageServices')
const studentsearch= require('./services/searchServices')
const adminanalytics = require('./services/adminDashboardServices')
const companyStatistics = require('./services/companyStatisticsServices')
const jobs = require('./services/jobServices')
const applications = require('./services/applicationServices')
//const photos = require('./services/photoServices')
//const adminCompanyProfile = require('./services/adminCompanyProfileServices')

const images= require('./services/imageServices')
const student=require('./services/studentServices')

const salaries = require('./services/salaryServices')
const interviews = require('./services/interviewServices')



function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('server is running ');
    consumer.on('message', function (message) {
        console.log('message received for ' + topic_name + " ", fname);
        // console.log(JSON.stringify(message.value));
        // console.log("JOSN parse",JSON.parse(message.value))
        var data = JSON.parse(message.value);
        console.log("Data", data)

        fname.handle_request(data.data, function (err, res) {
            console.log("Data.data", data.data)
            if (err) {
                // console.log('after handle' + res);
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: err
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    console.log("Error call back");
                });
                return;
            }
            else {
                // console.log('after handle' + JSON.stringify(res));
                var payloads = [
                    {
                        topic: data.replyTo,
                        messages: JSON.stringify({
                            correlationId: data.correlationId,
                            data: res
                        }),
                        partition: 0
                    }
                ];
                producer.send(payloads, function (err, data) {
                    // console.log(payloads);
                });
                return;
            }
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request
// handleTopicRequest("post_book", Books)

//handleTopicRequest("login", login)

handleTopicRequest("register", register)
handleTopicRequest("login", login)
handleTopicRequest("reviews",reviews)
handleTopicRequest("company",company)
handleTopicRequest("jobshomepage", jobshomepage)
handleTopicRequest("studentsearch", studentsearch)
handleTopicRequest("adminanalytics", adminanalytics)
handleTopicRequest("companyStatistics", companyStatistics)
handleTopicRequest("jobs", jobs)
handleTopicRequest("applications", applications)
handleTopicRequest("salaries", salaries)
handleTopicRequest("interviews", interviews)
handleTopicRequest("images",images)
handleTopicRequest("student",student)
//handleTopicRequest("photos",photos)
//handleTopicRequest("adminCompanyProfile",adminCompanyProfile)