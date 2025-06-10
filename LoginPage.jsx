import { useState } from "react";

function LoginPage({ onLogin }) {
  const [input, setInput] = useState("");
  
  const handleStart = () => {
    const names = input
      .split(",")
      .map(name => name.trim())
      .filter(name => name.length > 0);

    if (names.length >= 2 && names.length <= 6) {
      onLogin(names); // 🔥 Das ist der Startcode!
    } else {
      alert("Bitte 2 bis 6 Spielernamen eingeben (durch Komma getrennt).");
    }
  };

  return (
    <div>
      <h2>Spieler eingeben:</h2>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="z.B. Fabu, Aras, Moritz"
      />
      <button onClick={handleStart}>Spiel starten</button>
    </div>
  );
}

export default LoginPage;

