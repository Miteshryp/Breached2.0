import AdminLogin from "./Pages/AdminLogin";
import DashboardPage from "./Pages/DashboardPage";
import DeleteTestPage from "./Pages/DeleteTestPage";
import LandingPage from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import TestPage from "./Pages/TestPage";

export default {
   home: {
      path: "/",
      component: <LandingPage />
   },
   login: {
      path: "/login",
      component: <Login />
   },
   signup: {
      path: "/signup",
      component: <Signup />
   },
   dashboard: {
      path: "/dashboard",
      component: <DashboardPage />
   },
   testPage: {
      path: "/test",
      component: <TestPage />
   },
   deleteToken: {
      path: "/deleteToken",
      component: <DeleteTestPage />
   },
   adminLogin: {
      path: "/adminLogin",
      component: <AdminLogin />
   }
}