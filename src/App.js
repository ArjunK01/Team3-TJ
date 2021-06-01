import AuthProvider from "./context/AuthProvider";
import Navigation from "./components/Navigation.js";
import Calendar from "./components/Calendar"
import "./App.css";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Navigation />
        <Calendar/>
      </AuthProvider>
    </div>
  );
}

export default App;
