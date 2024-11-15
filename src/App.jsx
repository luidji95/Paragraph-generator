import { useEffect, useState } from "react";
import "./App.css";
import Modal from "./Modal";
import Joke from "./Joke";

function App() {
  const [number, setNumber] = useState(1);
  const [jokes, setJokes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newJoke, setNewJoke] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchJokes = async (count) => {
    try {
      const response = await fetch(
        `https://icanhazdadjoke.com/search?limit=${count}`,
        {
          headers: { Accept: "application/json" },
        }
      );
      const data = await response.json();
      setJokes(data.results);
    } catch (error) {
      console.error("Error fetching jokes:", error);
    }
  };

  const handleGenerate = () => {
    if (number > 0) {
      fetchJokes(number);
    }
  };

  const addNewJoke = () => {
    if (newJoke === "") {
      setErrorMessage("Please enter a joke!");
      return;
    }
    const newJokeObj = {
      id: Math.floor(Math.random() * 1000000),
      joke: newJoke,
    };
    setJokes((prevJokes) => [...prevJokes, newJokeObj]);
    setNewJoke("");
    setErrorMessage("");
    toggleModal();
  };

  const deleteJoke = (id) => {
    setJokes((prevJokes) => prevJokes.filter((joke) => joke.id !== id));
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <h3 className="h3">TIRED OF BORING LOREM IPSUM?</h3>
      <button className="add-joke" onClick={toggleModal}>
        Add new joke
      </button>

      <div className="generate-div">
        <p className="paragraph">Number of Jokes:</p>
        <input
          type="number"
          className="input"
          value={number}
          min="1"
          onChange={(e) => setNumber(Math.max(1, e.target.value))}
        />
        <button className="generate-button" onClick={handleGenerate}>
          Generate
        </button>
      </div>
      <div className="jokes-container">
        {jokes.map((joke) => (
          <Joke key={joke.id} joke={joke} onDelete={deleteJoke} />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        addJoke={addNewJoke}
        newJoke={newJoke}
        setNewJoke={setNewJoke}
        errorMessage={errorMessage}
      />
    </>
  );
}

export default App;
