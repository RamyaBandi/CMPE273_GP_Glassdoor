module.exports = {
    FRONTEND_URL: "http://localhost:3000",
    BACKEND_URL: "http://localhost:3001",

    //Login Routes
    POST_LOGIN: '/login',
    POST_REGISTER: '/register',
    FETCH_CUSTOMERINPUT: '/validationinput',

    // Student Home Page Tabs Routes
    STUDENT_TABS_ROUTE : '/studenttab',
    GET_COMPANY_HOMETAB : '/companytab',
    GET_SALARY_HOMETAB : '/salarytab',
    GET_INTERVIEW_HOMETAB : '/interviewtab',

    //Student Routes
    STUDENT_ROUTE: "/student",
    POST_STUDENT_SIGNUP: "/student/profile",
    GET_STUDENT_SIGNUP: "/student/profile",
    PUT_STUDENT_SIGNUP: "/student/profile",

    PUT_STUDENT_DEMOGRAPHICS:"/student/demographics",
    PUT_STUDENT_JOBPREFERENCE:"/student/jobpreference",
    POST_RESUME_UPLOAD: "/resume",
    GET_STUDENT_RESUMES: "/resume",
    PUT_PRIMARY_RESUME: "/primaryresume",
    DELETE_STUDENT_RESUME: "/resume",
    GET_PHOTOS_UPLOADED: '/gallery',

    //Students Reviews
    GET_COUNT_RATINGS: "/reviewcount",
 
    

    //Student Search Routes
    GET_SEARCH_RESULTS: "/search",
    GET_JOB_SEARCH: "/search/jobsearch",
    GET_COMPANY_SEARCH: "/search/companysearch",
    GET_SALARY_SEARCH: "/search/salarysearch",
    GET_INTERVIEW_SEARCH: "/search/interviewsearch",

    //Student Jobs Home Page
    JOBS_HOMEPAGE : "/jobshome",
    GET_JOBS_HOMEPAGE: "/jobshomepage",
    GET_JOBS_LOCATION: "/jobslocation",
    GET_JOBS_TYPE : "/jobstype",




    // Admin Analytics Dashboard
    ADMIN_ROUTES: "/admin",
    GET_REVIEWS_PER_DAY: "/reviewsperday",
    GET_TOP_REVIEWED_COMPANIES: "/topreviewedcompanies",
    GET_TOP_AVERAGE_RATED_COMPANIES: "/topaverageratedcompanies",
    GET_TOP_STUDENTS_ON_RATING: "/topstudentsratings",
    GET_TOP_CEO_RATING: "/topceorating",
    GET_TOP_COMPANY_VIEWS: "/topcompanyviews",

    //Admin Company Profile Routes
    GET_ALL_COMPANIES_ADMIN: "/companies",
    GET_COMPANY_BY_COMPANYNAME_ADMIN: "/company/companyName",
    GET_COMPANY_REVIEWS_ADMIN: "/company/reviews",

    //Company Routes
    COMPANY_ROUTE: "/company",
    PUT_COMPANY_SIGNUP: "/company/profile",
    GET_COMPANY_SIGNUP: "/company/profile",
    POST_COMPANY_SIGNUP: "/company/profile",
    POST_COMPANYVIEWS: "/viewsperday",
    PUT_FEATURED_REVIEWS: "/review/featured",

    //Company Details Routes
    GET_COMPANY_DETAILS: "/companyDetails",

    //Photo Routes
    PHOTO_ROUTE: "/photos",
    POST_COMPANY_PHOTOS: "/company",
    GET_COMPANY_PHOTOS: "/company",
    GET_ALL_PHOTOS: "/all",
    PUT_PHOTO_APPROVE: "/approve",
    PUT_PHOTO_REJECT: "/reject",

    //Job Routes
    JOB_ROUTE: "/job",
    POST_COMPANY_JOB: "/company/job",
    GET_COMPANY_JOBS: "/company/jobs",
    GET_COMPANY_JOB_BY_JOBID: "/company/job/jobId",
    GET_COMPANY_JOBS_BY_JOBTITLE_OR_CITY: '/company/jobs/jobTitleOrCity',
    GET_COMPANY_JOBS_BY_JOBTITLE: '/company/jobs/jobTitle',
    GET_COMPANY_JOBS_BY_CITY: '/company/jobs/city',
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
    GET_ALL_REVIEWS: "/all/reviews",
    GET_COMPANY_REVIEWS: "/company/reviews",
    GET_REVIEW_AVERAGE: "/average/review",
    PUT_COMPANY_REPLY: "/company/reply",
    PUT_COMPANY_REVIEW_HELPFUL: "/student/review/helpful",
    GET_POSITIVE_REVIEW: "/positive/review",
    GET_NEGATIVE_REVIEW: "/negative/review",
    PUT_REVIEW_APPROVE: "/approve/review",
    PUT_REVIEW_REJECT: "/reject/review",
    GET_REVIEW_DETAILS: "/details/review",
    GET_APPROVED_COMPANY_REVIEWS: "/approved/company/reviews",

    //Salary Routes
    SALARY_ROUTE: "/salary",
    POST_STUDENT_SALARY: "/student/salary",
    GET_STUDENT_SALARIES: "/student/salaries",
    GET_COMPANY_SALARIES: "/company/salaries",
    GET_SALARY_AVERAGES: "/company/jobTitles/salaries",

    //Interview Routes
    INTERVIEW_ROUTE: "/interview",
    POST_STUDENT_INTERVIEW: "/student/interview",
    GET_STUDENT_INTERVIEWS: "/student/interviews",
    GET_COMPANY_INTERVIEWS: "/company/interviews",
    GET_COMPANY_INTERVIEW_STATISTICS: '/company/interview/expPercentage',

    //Company Statistics
    STATISTICS_ROUTE: "/statistics",
    GET_STATISTICS_JOBS_COUNT: "/jobsCount",
    GET_STATISTICS_APPLICATIONS_COUNT: "/applicationsCount",
    GET_STATISTICS_APPLICANT_DEMOGRAPHICS: "/applicantDemographics",

    //Image Routes
    IMAGE_ROUTES: "/image",
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