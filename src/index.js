import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZWEyMDE1ZTFmOTQwMjMzMWE3NDhkYjZmY2VmYmZlNiIsIm5iZiI6MTc0NzQ3Nzc2OS40Njg5OTk5LCJzdWIiOiI2ODI4NjUwOWRhNzBiNTE0ZDZmNTUyZTciLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HUz9uc-_mOhHzj9Nugv_r36M02NkfEfqd4M3Ro_lf4U";

function App() {
  const [keyword, setKeyword] = useState("");
  const [movieLists, setMovieLists] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

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
      setMovieLists(data.results);
      setTotalPage(data.total_pages);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <div className="header">
        <h1>Movie Search</h1>
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

      <div>
        {[...Array(totalPage).keys()].map((n) => (
          <button>{n + 1}</button>
        ))}
      </div>
      {/* Result */}
      <div className="movie-lists">
        {movieLists.map((movie) => (
          <div className="movie" key={movie.id}>
            {movie.name}
          </div>
        ))}
      </div>
    </div>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
