import "../css/Card.css";

export default function Card({ imageUrl }) {
  return (
    <button className="card">
      <img src={imageUrl} />
    </button>
  );
}
