import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./home";
import DetailPage from "./detail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/detail" element={<DetailPage />}/>
      </Routes>
    </Router>
  );
}

export default App;
