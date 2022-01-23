import DashboardPage from "./Pages/DashboardPage";
import LandingPage from "./Pages/Landing";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

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
   }
}