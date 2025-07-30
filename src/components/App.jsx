import { useEffect, useState } from "react";
import "../css/App.css";
import Card from "./Card";
import shuffleArray from "../shuffleArray";

let didInit = false;

export default function App() {
  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);

  function handleIncreaseScore() {
    setScore(score + 1);
    setCards(shuffleArray(cards));
  }

  function fetchCards() {
    if (cards.length > 0) {
      setCards([]);
    }

    fetch(
      `https://api.thecatapi.com/v1/images/search?limit=12&api_key=${
        import.meta.env.VITE_API_KEY
      }`
    )
      .then((response) => response.json())
      .then((fetchedCards) => {
        setCards(
          fetchedCards.map((card) => {
            return { id: card.id, url: card.url };
          })
        );
      });
  }

  useEffect(() => {
    if (!didInit) {
      fetchCards();
      didInit = true;
    }
  });

  if (isGameOver) {
    setScore(0);
    setIsGameOver(false);
    fetchCards();
  }

  return (
    <div className="wrapper">
      <header>
        <h1>Memory Game (Cat Edition!)</h1>
        <div>
          <div className="score-board">
            <h3>Score: {score}</h3>
            <h3>Best Score: </h3>
          </div>
          <p className="instruction">
            Get points by clicking on an image but don't click on any more than
            once!
          </p>
        </div>
      </header>
      <div className="card-container">
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card
              key={card.id}
              imageUrl={card.url}
              handleIncreaseScore={handleIncreaseScore}
              setIsGameOver={setIsGameOver}
            />
          ))
        ) : (
          <p className="loading-message">Loading cards...</p>
        )}
      </div>
    </div>
  );
}
