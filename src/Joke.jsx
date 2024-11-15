import React from "react";

function Joke({ joke, onDelete }) {
  return (
    <div className="joke-card">
      <p>{joke.joke}</p>
      <button className="delete-button" onClick={() => onDelete(joke.id)}>
        Delete
      </button>
    </div>
  );
}

export default Joke;
