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
    <div className="card-container">
      {cards && cards.map((card) => <Card key={card.id} imageUrl={card.url} />)}
    </div>
  );
}
