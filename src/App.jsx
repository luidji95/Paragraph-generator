import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [number, setNumber] = useState(1);
  const [data, setData] = useState([]);
  const [paragraphs, setParagraphs] = useState([]);

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
    // Pravimo niz objekata koji sadrži `id` i `joke`
    const jokes = data.results.map((item) => ({
      id: item.id,
      joke: item.joke,
    }));
    const paragraphsToRender = jokes.slice(0, value);

    setParagraphs(
      paragraphsToRender.map(({ id, joke }) => (
        <div className="parag" key={id}>
          {joke}
          <button className="bad-joke" onClick={() => deleteJoke(id)}>
            Bad joke?
          </button>
        </div>
      ))
    );
  };

  const deleteJoke = (idToDelete) => {
    setParagraphs((prevParagraphs) =>
      prevParagraphs.filter((paragraph) => paragraph.key !== idToDelete)
    );
  };

  const addingNewJoke = () => {};

  return (
    <>
      <h3 className="h3">TIRED OF BORING LOREM IPSUM?</h3>
      <button className="add-joke" onClick={() => addingNewJoke()}>
        Add new joke
      </button>
      <div className="generate-div">
        <p className="paragraph">Paragraphs:</p>
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
      <div>{paragraphs}</div>
    </>
  );
}

export default App;
