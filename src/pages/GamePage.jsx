
export default function GamePage({ playersProp }) {
  return (
    <div style={{ padding: 40 }}>
      <h2>GamePage geladen ✅</h2>
      <p>Spieler: {playersProp.join(", ")}</p>
    </div>
  );
}
