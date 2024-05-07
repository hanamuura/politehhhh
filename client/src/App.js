import React, { useEffect, useState } from "react";

const BASE_URL = 'http://zoo.local'

function App() {
  const [response, setResponse] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${BASE_URL}/index/`);
        const json_response = await response.json();
        setResponse(json_response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      {response ? JSON.stringify(response) : "Loading..."}
    </div>
  );
}

export default App;