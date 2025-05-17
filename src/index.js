import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWEyMDE1ZTFmOTQwMjMzMWE3NDhkYjZmY2VmYmZlNiIsIm5iZiI6MTc0NzQ3Nzc2OS40Njg5OTk5LCJzdWIiOiI2ODI4NjUwOWRhNzBiNTE0ZDZmNTUyZTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HUz9uc-_mOhHzj9Nugv_r36M02NkfEfqd4M3Ro_lf4U";

function App() {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `${BASE_URL}/search/keyword?query=${keyword}&page=1`;
    const option = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
    };
    try {
      const response = await fetch(url, option);
      const data = await response.json();
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <div className="header">
        <h1>Movie App</h1>
      </div>
      {/* Input */}
      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Keyword ?"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
        <button type="submit">search</button>
      </form>
      {/* Result */}
      <div className="movie-lists">
        <div className="movie">Movie 1</div>
        <div className="movie">Movie 2</div>
      </div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
