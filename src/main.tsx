import ReactDOM from "react-dom/client"; // Import from react-dom/client
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom"; // Ensure BrowserRouter is here
import "./index.css";
import App from "./App";
import store from "./redux/store";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement); // Use createRoot
  root.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  );
}
