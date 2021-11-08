import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Routes from "./routes";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
      <Header />

      <main className="main_app">
        <Routes />
      </main>
    </div>
  );
}

export default App;
