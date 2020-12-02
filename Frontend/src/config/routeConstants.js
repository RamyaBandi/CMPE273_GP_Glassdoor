module.exports = {
    FRONTEND_URL: "http://localhost:3000",
    BACKEND_URL: "http://localhost:3001",
    // BACKEND_URL: 'http://13.52.213.227:3001',
    // BACKEND_URL: 'http://54.67.58.148:3001',

    //Input validation

    FETCH_VALIDATIONDETAILS: '/validateroute/validationinput',

    // Registration Routes
    POST_REGISTRATION: '/registerroute/register',

    //Login Routes
    POST_LOGIN: '/loginroute/login',
    //Login Routes

    POST_REGISTER: '/register',
    FETCH_CUSTOMERINPUT: '/validationinput',

    //Student Search Routes
    GET_SEARCH_JOBS: '/search/search/jobsearch',
    GET_SEARCH_COMPANY: '/search/search/companysearch',
    GET_SEARCH_SALARY: "/search/search/salarysearch",
    GET_SEARCH_INTERVIEW: "/search/search/interviewsearch",
    // GET_JOBS_HOMEPAGE : "/jobshomepage/jobshomepage",


    //Admin Analytics Dashboard Routes
    GET_REVIEWS_PER_DAY: "/admin/reviewsperday",
    GET_TOP_REVIEWED_COMPANIES: "/admin/topreviewedcompanies",
    GET_TOP_AVERAGE_RATED_COMPANIES: "/admin/topaverageratedcompanies",
    GET_TOP_STUDENTS_ON_RATING: "/admin/topstudentsratings",
    GET_TOP_CEO_RATING: "/admin/topceorating",
    GET_TOP_COMPANY_VIEWS: "/admin/topcompanyviews",

    //Review Routes
    POST_STUDENT_REVIEW: '/review/student/review',
    GET_COMPANY_REVIEWS: '/review/company/reviews',
    GET_STUDENT_REVIEWS: '/review/student/reviews',
    PUT_STUDENT_REVIEW_HELPFUL: '/review/student/review/helpful',
    GET_POSITIVE_REVIEW: '/review/positive/review',
    GET_NEGATIVE_REVIEW: '/review/negative/review',
    PUT_FEATURED_REVIEWS: '/review/featured',
    PUT_COMPANY_REPLY: '/company/reply',
    GET_REVIEW_AVERAGE: '/review/average/review',
    PUT_REVIEW_APPROVE: '/review/approve/review',
    PUT_REVIEW_REJECT: '/review/reject/review',
    GET_ALL_REVIEWS: '/review/all/reviews',
    GET_REVIEW_DETAILS: '/review/details/review',

    //Salary Routes
    POST_STUDENT_SALARY: '/salary/student/salary',
    GET_COMPANY_SALARIES: '/salary/company/salaries',
    GET_STUDENT_SALARIES: '/salary/student/salaries',

    //Interview Routes
    POST_STUDENT_INTERVIEW: '/interview/student/interview',
    GET_COMPANY_INTERVIEWS: '/interview/company/interviews',
    GET_STUDENT_interviewS: '/interview/student/interviews',
    GET_COMPANY_INTERVIEW_STATISTICS: '/interview/company/interview/expPercentage',

    //Student Search Routes
    GET_SEARCH_RESULTS: "/search",
    GET_JOB_SEARCH: "/search/jobsearch",
    GET_COMPANY_SEARCH: "/search/companysearch",
    GET_SALARY_SEARCH: "/search/salarysearch",
    GET_INTERVIEW_SEARCH: "/search/interviewsearch",

    //Student Jobs Home Page

    GET_STUDENTS_JOBS_HOMEPAGE: "/jobshomepage/jobshomepage",


    //Student SignUp
    GET_STUDENT_SIGNUP: "/student/profile",
    PUT_STUDENT_SIGNUP: "/student/profile",
    PUT_STUDENT_DEMOGRAPHICS: "/student/demographics",
    PUT_STUDENT_JOBPREFERENCE: "/student/jobpreference",

    //CompanyRoutes
    GET_COMPANY_DETAILS: '/company/company/profile',
    GET_JOBS_HOMEPAGE: "/jobshomepage",
    COMPANY_ROUTE: "/company",
    PUT_COMPANY_SIGNUP: "/company/profile",
    GET_COMPANY_SIGNUP: "/company/profile",
    POST_COMPANY_SIGNUP: "/company/profile",
    POST_COMPANYVIEWS: "/company/viewsperday",


    //Company Details Routes
    //GET_COMPANY_DETAILS: "/companyDetails",

    //Job Routes
    JOB_ROUTE: "/job",
    POST_COMPANY_JOB: "/company/job",
    GET_COMPANY_JOBS: "/company/jobs",
    GET_COMPANY_JOB_BY_JOBID: '/company/job/jobId',
    GET_COMPANY_JOB_BY_JOBTITLE: '/company/job/jobTitle',
    GET_COMPANY_JOB_BY_CITY: '/company/job/city',
    PUT_COMPANY_JOB: '/company/job',
    GET_ALL_JOBS: '/company/jobList',

    //Application Routes
    APPLICATION_ROUTE: "/applications",
    POST_APPLICATION: '/',
    PUT_APPLICATION: '/',
    GET_APPLICATIONS_JOBID: '/jobId',
    GET_APPLICATIONS_STUDENTID: '/studentId',
    GET_APPLICATIONS_ALL: '/',


    //Company Statistics
    STATISTICS_ROUTE: "/statistics",
    GET_STATISTICS_JOBS_COUNT: "/jobsCount",
    GET_STATISTICS_APPLICATIONS_COUNT: "/applicationsCount",
    GET_STATISTICS_APPLICANT_DEMOGRAPHICS: "/applicantDemographics",
    //Image Routes
    POST_IMAGE_USER_PROFILE: "/company/image",
    POST_IMAGE_STUDENT_PROFILE: "/student/image",

    //KAFKA TOPICS
    TOPIC_LOGIN: 'login',
    TOPIC_RESTAURANT: 'restaurant',
    TOPIC_CUSTOMER: 'customer',
    TOPIC_ORDERS: 'order',
    TOPIC_REVIEWS: 'review',
    TOPIC_EVENTS: 'event',

    /**Response status codes */
    RES_UNKNOWN_ERROR: 502,
    RES_BAD_REQUEST: 400,
    RES_NOT_FOUND: 404,
    RES_DUPLICATE_RESOURCE: 409,
    RES_SUCCESS: 200,
    RES_INTERNAL_SERVER_ERROR: 500
}