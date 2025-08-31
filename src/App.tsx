import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RequestAxios } from "../src/services/api_service";
import { useEffect } from "react";
import { criticalStartUpChecks } from "./utilities/start_up_checks";
import PageHeader from "./structure/header";

//page imports
import HomePage from "./pages/HomePage";
import LatestData from "./pages/LatestData";
import StartUpErrorPage from "./pages/StartUpError/StartUpErrorPage";
import SignUpPage from "./pages/SignUpPage";

console.log("Performing Start Checks");
const startChecks = criticalStartUpChecks();
if (startChecks.length > 0) {
  console.error("\nCRITICAL ERROR - .ENV VALUES");
  startChecks.forEach((error) => {
    console.error(error);
  });
}

function App() {
  return (
    <Router>
        <Routes>
          <Route element={<PageHeader/>} >
          <Route path="/" element={<HomePage />} />
          <Route path="/latestData/:symbol" element={<LatestData />} />
          </Route>
        </Routes>
      <Routes>
        <Route path="/something_went_wrong" element={<StartUpErrorPage />} />
        <Route path="/sign_up" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
}

export default App;
