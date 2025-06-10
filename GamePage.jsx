import { useState, useEffect } from "react";
import { createPlayers } from "../utils/playerState";
import {
  getCurrentField,
  getRandomQuestion,
  movePlayer,
  isWinner
} from "../utils/gameLogic";

export default function GamePage({ playersProp }) {
    
console.log("GamePage loaded ✅", playersProp);
  const [players, setPlayers] = useState(createPlayers(playersProp));
  const [turn, setTurn] = useState(0);
  const [currentQ, setCurrentQ] = useState(null);

  const active = players[turn];
  const field = getCurrentField(active);

  useEffect(() => {
    if (field.category === "ziel") return;
    const newQ = getRandomQuestion(
      field.category,
      active.answered[field.category] || []
    );
    setCurrentQ(newQ);
  }, [turn]);

  if (field.category === "ziel")
    return <h1>{active.name} hat gewonnen! 🎉</h1>;

  const handleAnswer = (letter) => {
    const correct = letter === currentQ.correct;
    const updatedPlayers = [...players];
    const me = { ...active };

    me.position = movePlayer(me, correct, currentQ.difficulty);
    me.answered[field.category] = [
      ...(me.answered[field.category] || []),
      currentQ.id
    ];
    updatedPlayers[turn] = me;
    setPlayers(updatedPlayers);

    setTurn((turn + 1) % players.length);
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Am Zug: {active.name}</h2>
      <p>Feld: {field.id} ({field.category})</p>

      {currentQ && (
        <>
          <h3>({currentQ.difficulty}) {currentQ.question}</h3>
          {currentQ.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(opt[0])}
              style={{ margin: "5px", display: "block" }}
            >
              {opt}
            </button>
          ))}
        </>
      )}
    </div>
  );
}
