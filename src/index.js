import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

function App() {
  const [category, setCategory] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Effect Hook - Category");
    async function fetchLists() {
      const BASE_URL = "https://jsonplaceholder.typicode.com";
      try {
        const response = await fetch(`${BASE_URL}/${category}`, {
          method: "GET",
        });
        const data = await response.json();
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }
    if (category) fetchLists();
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
        <li className="lists__item">item-1</li>
      </ul>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
