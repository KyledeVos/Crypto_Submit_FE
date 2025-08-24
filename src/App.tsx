import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { getRequestAxios } from "../src/services/api_service";
import { useEffect } from "react";

//page imports
import HomePage from "./pages/HomePage";

function App() {
  useEffect(() => {
    const getTestResponse = async () => {
      return await getRequestAxios({ route: "/hello", data: { name: "test" } });
    };
    getTestResponse();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
