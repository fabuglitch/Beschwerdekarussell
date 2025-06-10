
import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [input, setInput] = useState("");

  const handleStart = () => {
    const names = input
      .split(",")
      .map(n => n.trim())
      .filter(Boolean);
    if (names.length >= 2 && names.length <= 6) onLogin(names);
    else alert("Mind. 2 und max. 6 Spielernamen, getrennt mit Komma eingeben!");
  };

  return (
    <div style={{ padding: 40 }}>
      <h2>Spieler anmelden</h2>
      <p>Namen durch Komma trennen (min 2, max 6):</p>
      <input
        style={{ width: "70%" }}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Fabu, Aras, …"
      />
      <br />
      <button onClick={handleStart}>Start</button>
    </div>
  );
}
