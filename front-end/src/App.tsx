import "./App.css";
import NavigationBar from "./Navigation/Navigation"; 
import Home from "./components/Home";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <NavigationBar />
      </header>
      <Home />
    </div>
  );
}

export default App;
