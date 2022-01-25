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
      </Routes>
    </Router>

  );
}

export default App;
