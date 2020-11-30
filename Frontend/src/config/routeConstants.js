module.exports = {
    FRONTEND_URL: "http://localhost:3000",
    BACKEND_URL: "http://localhost:3001",

    //Login Routes
    POST_LOGIN: '/login',
    POST_REGISTER: '/register',
    FETCH_CUSTOMERINPUT: '/validationinput',

<<<<<<< HEAD
    //Student Routes
    STUDENT_ROUTE: "/student",
    POST_STUDENT_SIGNUP: "/student/profile",
=======
    //Student Search Routes
    GET_SEARCH_JOBS : '/search/search/jobsearch',
    GET_SEARCH_COMPANY : '/search/search/companysearch',
    GET_SEARCH_SALARY : "/search/search/salarysearch",
    GET_SEARCH_INTERVIEW : "/search/search/interviewsearch",
    GET_JOBS_HOMEPAGE : '/jobshomepage/jobshomepage',

    //Review Routes
    POST_STUDENT_REVIEW: '/review/student/review',
    GET_COMPANY_REVIEWS: '/review/company/reviews',
    GET_STUDENT_REVIEWS: '/review/student/reviews',
>>>>>>> f7308429799bf65b9a609c527594f248bda8f8d4

    //Student Search Routes
    GET_SEARCH_RESULTS: "/search",
    GET_JOB_SEARCH : "/search/jobsearch",
    GET_COMPANY_SEARCH : "/search/companysearch",
    GET_SALARY_SEARCH : "/search/salarysearch",
    GET_INTERVIEW_SEARCH : "/search/interviewsearch",

    //Student Jobs Home Page

    GET_JOBS_HOMEPAGE : "/jobshomepage",

    //Company Routes
    COMPANY_ROUTE: "/company",
    PUT_COMPANY_SIGNUP: "/company/profile",
    GET_COMPANY_SIGNUP: "/company/profile",
    POST_COMPANY_SIGNUP: "/company/profile",

    
    //Company Details Routes
    GET_COMPANY_DETAILS: "/companyDetails",

    //Job Routes
    JOB_ROUTE: "/job",
    POST_COMPANY_JOB: "/company/job",
    GET_COMPANY_JOBS: "/company/jobs",
    GET_COMPANY_JOB: '/company/job',
    PUT_COMPANY_JOB: '/company/job',
    GET_ALL_JOBS: '/company/jobList',


    //Review Routes
    REVIEW_ROUTE: "/review",
    POST_STUDENT_REVIEW: "/student/review",
    GET_STUDENT_REVIEWS: "/student/reviews",
    GET_ALL_REVIEWS: "/company/reviews",
    GET_COMPANY_REVIEWS: "/company/reviews",
    POST_COMPANY_REPLY: "/company/reply",

    //Salary Routes
    SALARY_ROUTE: "/salary",
    POST_STUDENT_SALARY: "/student/salary",
    GET_STUDENT_SALARIES: "/student/salaries",
    GET_COMPANY_SALARIES: "/company/salaries",

    //Interview Routes
    INTERVIEW_ROUTE: "/interview",
    POST_STUDENT_INTERVIEW: "/student/interview",
    GET_STUDENT_INTERVIEWS: "/student/interviews",
    GET_COMPANY_INTERVIEWS: "/company/interviews",

    //KAFKA TOPICS
    TOPIC_LOGIN: 'login',

    /**Response status codes */
    RES_UNKNOWN_ERROR: 502,
    RES_BAD_REQUEST: 400,
    RES_NOT_FOUND: 404,
    RES_DUPLICATE_RESOURCE: 409,
    RES_SUCCESS: 200,
    RES_INTERNAL_SERVER_ERROR: 500
}