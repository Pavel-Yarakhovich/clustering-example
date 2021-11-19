import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Components
import { ClusteringExample } from "./ClusteringExample";
import CsvLocalizer from "./components/csvLocalizer/csvLocalizer";
import JsonLocalizer from "./components/csvLocalizer/jsonLocalizer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Link className="router-link" to="/clustering">
          Clustering
        </Link>
        <Link className="router-link" to="/csv-localizer">
          CSV localizer
        </Link>
        <Link className="router-link" to="/json-localizer">
          JSON localizer
        </Link>
        <Switch>
          <Route path="/clustering">
            <header className="App-header">
              <p>Clustering Example</p>
            </header>
            <main>
              <div className="Charts">
                <ClusteringExample />
              </div>
            </main>
          </Route>
          <Route path="/csv-localizer">
            <CsvLocalizer />
          </Route>
          <Route path="/json-localizer">
            <JsonLocalizer />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
