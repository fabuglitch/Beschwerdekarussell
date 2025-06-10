import { useState } from "react";
import { createPlayers } from "../utils/playerState";
import { getCurrentField, getRandomQuestion, movePlayer, isWinner } from "../utils/gameLogic";
import questions from "../data/questions";

export default function GamePage({ playersProp, onRestart }) {
  const [players, setPlayers] = useState(createPlayers(playersProp));
  const [current, setCurrent] = useState(0); // Wer ist dran?
  const [currentQ, setCurrentQ] = useState(getRandomQuestion(getCurrentField(players[0]).category));
  const [showWinner, setShowWinner] = useState(false);

  // Wenn noch kein Spiel, lade minimal:
  if (!players.length) return <div>Keine Spieler gefunden.</div>;

  const player = players[current];
  const field = getCurrentField(player);

  // Handler für Antwort
  const handleAnswer = (isCorrect, difficulty) => {
    // Spieler verschieben
    const newPos = movePlayer(player, isCorrect, difficulty);
    const updatedPlayers = [...players];
    updatedPlayers[current] = { ...player, position: newPos };

    // Gewinner?
    if (isWinner({ ...player, position: newPos })) {
      setPlayers(updatedPlayers);
      setShowWinner(true);
      return;
    }

    // Nächster Spieler
    let nextIndex = (current + 1) % players.length;
    setPlayers(updatedPlayers);
    setCurrent(nextIndex);
    const nextField = getCurrentField(updatedPlayers[nextIndex]);
    setCurrentQ(getRandomQuestion(nextField.category));
  };

  // Nach Sieg:
  if (showWinner) {
    return (
      <div style={{ color: "#fff", textAlign: "center", marginTop: 80 }}>
        <h2>🎉 Gewinner: {player.name} 🎉</h2>
        <button onClick={onRestart}>Neues Spiel</button>
      </div>
    );
  }

  // Falls keine Frage mehr:
  if (!currentQ) {
    return (
      <div style={{ color: "#fff", textAlign: "center", marginTop: 80 }}>
        <h2>Keine Fragen mehr!</h2>
        <button onClick={onRestart}>Neues Spiel</button>
      </div>
    );
  }

  return (
    <div style={{ color: "#fff", padding: 40 }}>
      <h2>Spieler: {player.name} (Feld: {field.id}, {field.category})</h2>
      <h3>Frage:</h3>
      <div>{currentQ.question}</div>
      <div style={{ marginTop: 20 }}>
        {currentQ.options.map((opt, i) => (
          <button
            key={i}
            style={{ margin: "8px", padding: "12px 18px", fontSize: 18 }}
            onClick={() => handleAnswer(opt === currentQ.correct, currentQ.difficulty)}
          >
            {opt}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 32 }}>
        <b>Alle Spieler:</b> {players.map(p => `${p.name} (${p.position})`).join(", ")}
      </div>
    </div>
  );
}
