import { BrowserRouter as Router, Routes, Route} from "react-router-dom"
import navigationData from "./navigation";

function App() {
  let arr = [];
  Object.keys(navigationData).forEach((key) => {
    arr.push(navigationData[key]);
  });


  return (
    <Router>
      <Routes>
        {
          arr.map((element) => <Route exact path={element.path} element={element.component} />)
        }
        {/* <Route exact path="/landing" element={<LandingPage />} />
        <Route exact path="/test" element={<TestPage />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/deleteToken" element={<DeleteTestPage />} /> */}
      </Routes>
    </Router>

  );
}

export default App;
