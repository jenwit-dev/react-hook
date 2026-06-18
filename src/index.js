import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [category, setCategory] = useState("");
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);

  useEffect(() => {
    console.log("Effect Hook - Category");
    async function fetchLists() {
      const BASE_URL = "https://jsonplaceholder.typicode.com";
      try {
        const response = await fetch(`${BASE_URL}/${category}`, {
          method: "GET",
        });
        const dataJSON = await response.json();
        setData(dataJSON);
      } catch (err) {
        console.log(err);
      }
    }
    if (category) fetchLists();
    return () => {
      console.log("cleanup", category);
    };
  }, [category]);

  console.log("render");

  return (
    <div>
      <h1>useEffect : {category || "not select"}</h1>
      <div className="button__group">
        <button onClick={() => setCategory("posts")}>posts</button>
        <button onClick={() => setCategory("photos")}>photos</button>
        <button onClick={() => setCategory("todos")}>todos</button>
        <button onClick={() => setCategory("users")}>users</button>
        <button onClick={() => setCount((c) => c + 1)}>+</button>
        <div>{count}</div>
        <button onClick={() => setCount((c) => c - 1)}>-</button>
      </div>

      <ul className="lists">
        {data.map((obj) => (
          <li className="lists__item" key={obj.id}>
            {obj.body || obj.name || obj.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
// https://github.com/pavitpim40/todolist-api-v2
