// Components
import { ClusteringExample } from "./ClusteringExample";
import "./App.css";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Clustering Example</p>
      </header>
      <main>
        <div className="Charts">
          <ClusteringExample />
        </div>
      </main>
    </div>
  );
}

export default App;
