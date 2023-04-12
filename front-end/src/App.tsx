import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./Navigation/Navigation"; 
import Home from "./components/Home";
import SingleLot from "./components/Lot";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavigationBar />
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/lots/:id" element={<SingleLot />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
