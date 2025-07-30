import { useState } from "react";
import "../css/Card.css";

export default function Card({ imageUrl, handleIncreaseScore, setIsGameOver }) {
  const [isClicked, setIsClicked] = useState(false);

  function handleClick() {
    if (isClicked) {
      setIsGameOver(true);
      return;
    }
    handleIncreaseScore();
    setIsClicked(true);
  }

  return (
    <button className="card" onClick={handleClick}>
      <img src={imageUrl} />
    </button>
  );
}
