import ContextWrapper from './components/ContextWrapper';
import Navigation from "./components/Navigation.js";
import Calendar from "./components/Calendar"
import "./App.css";

function App() {
  return (
    <div className="App">
      <ContextWrapper>
        <Navigation />
      </ContextWrapper>
    </div>
  );
}

export default App;
