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

    //Company Routes
    COMPANY_ROUTE: "/company",
    PUT_COMPANY_SIGNUP: "/company/profile",
    GET_COMPANY_SIGNUP: "/company/profile",
    POST_COMPANY_SIGNUP: "/company/profile",

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