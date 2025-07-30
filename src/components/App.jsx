import { useEffect, useState } from "react";
import "../css/App.css";
import Card from "./Card";

let didInit = false;

export default function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (!didInit) {
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
  }, []);

  return (
    <div className="wrapper">
      <header>
        <h1>Memory Game (Cat Edition!)</h1>
        <div>
          <div className="score-board">
            <h3>Score: </h3>
            <h3>Best Score: </h3>
          </div>
          <p className="instruction">
            Get points by clicking on an image but don't click on any more than
            once!
          </p>
        </div>
      </header>
      <div className="card-container">
        {cards &&
          cards.map((card) => <Card key={card.id} imageUrl={card.url} />)}
      </div>
    </div>
  );
}
