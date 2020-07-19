import React from "react";
import "./App.css";
import Background from "./Components/Background/Background";
import Board from "./Components/Board/Board";

function App() {
  return (
    <Background>
      <Board />
    </Background>
  );
}

export default App;
