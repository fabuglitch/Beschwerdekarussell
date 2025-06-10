
import { useState } from "react";
import LoginPage from "./pages/LoginPage";
import GamePage from "./pages/GamePage";

function App() {
  const [playerNames, setPlayerNames] = useState(null);

  const hasValidPlayers =
    Array.isArray(playerNames) && playerNames.length >= 2;

  return hasValidPlayers ? (
    <GamePage playersProp={playerNames} />
  ) : (
    <LoginPage onLogin={setPlayerNames} />
  );
}

export default App;
