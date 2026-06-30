import "./StatCard.css";

function StatCard({ title, value, onClick }) {
  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        cursor: onClick ? "pointer" : "default",
      }}
    >
      <div className="card-title">
        {title}
      </div>

      <div className="card-value">
        {value}
      </div>
    </div>
  );
}

export default StatCard;