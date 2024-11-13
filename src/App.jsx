import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [number, setNumber] = useState(1);
  const [data, setData] = useState([]);
  // izbristi joke
  // dugme add joke za dodavanje
  // ako sam dodao joke i  napravim refetch neka izadje modal da pita da li zelimo da zadrzimo svoju novu salu ako se klikne
  // na yes fetchuju se tih 10 i dodaje se nova ako ne dodju novih 10

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://icanhazdadjoke.com/search?limit=5",
          {
            headers: {
              Accept: "application/json",
            },
          }
        );

        const data = await response.json();
        setData(data);
        console.log("Fetched data:", data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const renderParagraphs = (value) => {
    const jokes = data.results.map((item) => item.jokes);

    const paragraphToRender = jokes.slice(0, value);

    return paragraphToRender.map((paragraph) => <p>{paragraph}</p>);
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
