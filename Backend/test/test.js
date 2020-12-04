//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
// let server = require('../server');
let should = chai.should();
let routeConstants = require('../config/routeConstants')

chai.use(chaiHttp);

describe('Jobs', () => {

    describe('/job/company', () => {
        it('it should GET unauthorized', (done) => {
            chai.request(`${routeConstants.BACKEND_URL}`)
                .get(`/job${routeConstants.GET_COMPANY_JOBS}`)
                .end((err, res) => {
                    res.should.have.status(401);
                    done();
                });
        });
    });

});

describe('Reviews', () => {

    describe('/review/company', () => {
        it('it should GET all the reviews', (done) => {
            chai.request(`${routeConstants.BACKEND_URL}`)
                .get(`/review${routeConstants.GET_COMPANY_REVIEWS}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});

describe('Salaries', () => {

    describe('/salary/company', () => {
        it('it should GET all the salaries', (done) => {
            chai.request(`${routeConstants.BACKEND_URL}`)
                .get(`/salary${routeConstants.GET_COMPANY_SALARIES}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    done();
                });
        });
    });

});