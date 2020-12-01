module.exports = {
    FRONTEND_URL: "http://localhost:3000",
    BACKEND_URL: "http://localhost:3001",

    //Login Routes
    POST_LOGIN: '/login',
    POST_REGISTER: '/register',
    FETCH_CUSTOMERINPUT: '/validationinput',

    //Student Routes
    STUDENT_ROUTE: "/student",
    POST_STUDENT_SIGNUP: "/student/profile",
    GET_STUDENT_SIGNUP: "/student/profile",
    PUT_STUDENT_SIGNUP: "/student/profile",

    //Student Search Routes
    GET_SEARCH_RESULTS: "/search",
    GET_JOB_SEARCH: "/search/jobsearch",
    GET_COMPANY_SEARCH: "/search/companysearch",
    GET_SALARY_SEARCH: "/search/salarysearch",
    GET_INTERVIEW_SEARCH: "/search/interviewsearch",

    //Student Jobs Home Page

    GET_JOBS_HOMEPAGE: "/jobshomepage",


    

    // Admin Analytics Dashboard
    ADMIN_ROUTES : "/admin",
    GET_REVIEWS_PER_DAY : "/reviewsperday",
    GET_TOP_REVIEWED_COMPANIES : "/topreviewedcompanies",
    GET_TOP_AVERAGE_RATED_COMPANIES : "/topaverageratedcompanies",
    GET_TOP_STUDENTS_ON_RATING : "/topstudentsratings",
    GET_TOP_CEO_RATING : "/topceorating",
    GET_TOP_COMPANY_VIEWS : "/topcompanyviews",

    //Company Routes
    COMPANY_ROUTE: "/company",
    PUT_COMPANY_SIGNUP: "/company/profile",
    GET_COMPANY_SIGNUP: "/company/profile",
    POST_COMPANY_SIGNUP: "/company/profile",
    POST_COMPANYVIEWS : "/viewsperday",
    PUT_FEATURED_REVIEWS: "/review/featured",
   
    //Company Details Routes
    GET_COMPANY_DETAILS: "/companyDetails",

    //Job Routes
    JOB_ROUTE: "/job",
    POST_COMPANY_JOB: "/company/job",
    GET_COMPANY_JOBS: "/company/jobs",
    GET_COMPANY_JOB: '/company/job',
    PUT_COMPANY_JOB: '/company/job',
    GET_ALL_JOBS: '/company/jobList',

    //Application Routes
    APPLICATION_ROUTE: "/applications",
    POST_APPLICATION: '/',
    PUT_APPLICATION: '/',
    GET_APPLICATIONS_JOBID: '/jobId',
    GET_APPLICATIONS_STUDENTID: '/studentId',
    GET_APPLICATIONS_ALL: '/',

    //Review Routes
    REVIEW_ROUTE: "/review",
    POST_STUDENT_REVIEW: "/student/review",
    GET_STUDENT_REVIEWS: "/student/reviews",
    GET_ALL_REVIEWS: "/company/reviews",
    GET_COMPANY_REVIEWS: "/company/reviews",

    PUT_COMPANY_REPLY: "/company/reply",
    PUT_COMPANY_REVIEW_HELPFUL: "/student/review/helpful",
    GET_POSITIVE_REVIEW: "/positive/review",
    GET_NEGATIVE_REVIEW: "/negative/review",


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


    //Image Routes
    IMAGE_ROUTES:"/image",
    POST_IMAGE_USER_PROFILE: "/company/image",
    POST_IMAGE_STUDENT_PROFILE: "/student/image",
    
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