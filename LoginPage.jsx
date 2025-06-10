import { useState } from "react";

// CSS-in-JS für Animation
const shakeAnim = `
@keyframes shake {
  10%, 90% { transform: translateX(-2px); }
  20%, 80% { transform: translateX(4px); }
  30%, 50%, 70% { transform: translateX(-8px); }
  40%, 60% { transform: translateX(8px); }
}
`;

export default function LoginPage({ onLogin }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [shake, setShake] = useState(false);

  const handleStart = () => {
    const names = input
      .split(",")
      .map(n => n.trim())
      .filter(Boolean);
    if (names.length >= 2 && names.length <= 6) {
      setError("");
      setShake(false);
      onLogin(names);
    } else {
      setError("😡 Mindestens 2 und maximal 6 Spielernamen, getrennt durch Komma!");
      setShake(true);
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div style={{
      padding: 40,
      maxWidth: 400,
      margin: "40px auto",
      borderRadius: 20,
      background: "linear-gradient(135deg, #008cff 50%, #c471f5 100%)",
      boxShadow: "0 4px 32px rgba(44,62,80,0.10)",
      textAlign: "center",
      border: "3px solid #fff"
    }}>
      <style>{shakeAnim}</style>
      <h2 style={{ color: "#fff", marginBottom: 20, textShadow: "1px 1px 4px #C471F5" }}>Spieler anmelden</h2>
      <p style={{ color: "#fff", fontWeight: 600 }}>Namen durch Komma trennen <br/>(min. 2, max. 6):</p>
      <input
        style={{
          width: "90%",
          padding: "12px",
          border: "2px solid #fff",
          borderRadius: 10,
          fontSize: 17,
          marginBottom: 14,
          background: "#fff",
          color: "#333",
          outline: shake ? "2px solid #d90429" : "none",
          animation: shake ? "shake 0.5s" : "none"
        }}
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Fabu, Aras, Moritz"
        onKeyDown={e => { if (e.key === "Enter") handleStart(); }}
      />
      <br />
      <button
        style={{
          marginTop: 8,
          padding: "10px 32px",
          fontSize: 17,
          borderRadius: 8,
          background: "linear-gradient(90deg,#008cff 60%, #a100ff 100%)",
          color: "#fff",
          border: "none",
          cursor: "pointer",
          fontWeight: 600,
          boxShadow: "0 2px 10px #c471f511"
        }}
        onClick={handleStart}
      >
        Start
      </button>
      {error &&
        <div style={{
          marginTop: 18,
          color: "#fff",
          background: "linear-gradient(90deg, #d90429 60%, #8f00ff 100%)",
          borderRadius: 10,
          padding: "12px 8px",
          fontWeight: 700,
          letterSpacing: 0.5,
          animation: shake ? "shake 0.5s" : "none",
          boxShadow: "0 2px 8px #d9042944"
        }}>
          {error} <span role="img" aria-label="ärgern">😡</span>
        </div>
      }
    </div>
  );
}

