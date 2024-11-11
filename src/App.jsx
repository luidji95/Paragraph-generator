import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [number, setNumber] = useState(1);
  const [data, setData] = useEffect([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://example.org/post", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderParagraphs = (value) => {
    console.log(value);
  };

  return (
    <>
      <h3 className="h3">TIRED OF BORING LOREM IPSUM?</h3>
      <div className="generate-div">
        <p className="parag">Paragraphs:</p>
        <input
          type="number"
          className="input"
          value={number}
          min="1"
          onChange={(e) => setNumber(Math.max(1, e.target.value))}
        />
        <button
          className="generate-button"
          onClick={() => renderParagraphs(number)}
        >
          Generate
        </button>
      </div>
    </>
  );
}

export default App;
