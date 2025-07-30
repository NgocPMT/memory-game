import "../css/Card.css";

export default function Card({ imageUrl }) {
  return (
    <div className="card">
      <img src={imageUrl} />
    </div>
  );
}
