const baseURL = process.env.REACT_APP_BACKEND_URL;
console.log(baseURL);
export default {
    login: baseURL +  "/user/login",
    signup: baseURL + "/user/signup",
    adminLogin: baseURL + "/user/admin/login",
    logout: baseURL + "/logout",
    accountDetails: baseURL + "/user/account",
    activeContestList: baseURL + '/contest/getActiveContest',
    register: baseURL + '/contest/register',
    submit: baseURL + '/contest/submit',
    getCurrentQuestion: baseURL + '/contest/getCurrentQuestion',
    getOverallLeaderboard: baseURL + '/contest/getOverallLeaderboard',
    getContestDescription: baseURL + '/meta/getContestDescription'
};