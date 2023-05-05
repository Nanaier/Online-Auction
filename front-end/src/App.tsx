import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavigationBar from "./components/Navbar/Navigation"; 
import Home from "./components/HomePage/HomePage";
import SingleLot from "./components/Lot/Lot";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Profile from "./components/Profile/Profile";
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
