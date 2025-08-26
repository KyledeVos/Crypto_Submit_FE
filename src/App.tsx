import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { RequestAxios } from "../src/services/api_service";
import { useEffect } from "react";
import { criticalStartUpChecks } from "./utilities/start_up_checks";

//page imports
import HomePage from "./pages/HomePage";
import LatestData from "./pages/LatestData";
import StartUpErrorPage from "./pages/StartUpError/StartUpErrorPage";

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
        <Route path="/" element={<HomePage />} />
        <Route path="/something_went_wrong" element={<StartUpErrorPage />} />
        <Route path="/latestData/:symbol" element={<LatestData />} />
      </Routes>
    </Router>
  );
}

export default App;
