import ContextWrapper from './components/ContextWrapper';
import Navigation from "./components/Navigation.js";

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
