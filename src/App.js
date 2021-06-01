import AuthProvider from "./context/AuthProvider";
import Navigation from "./components/Navigation.js";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </div>
  );
}

export default App;
