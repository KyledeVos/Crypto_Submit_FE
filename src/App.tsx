import "./App.css";
import { getRequestAxios } from "../src/services/api_service";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const getTestResponse = async () => {
      return await getRequestAxios({ route: "/hello", data: { name: "test" } });
    };
    getTestResponse();
  }, []);

  return (
    <>
      <h1>Home Page</h1>
    </>
  );
}

export default App;
