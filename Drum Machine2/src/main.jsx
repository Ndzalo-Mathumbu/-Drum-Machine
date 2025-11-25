import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
// import { DrumMachine } from "./assets/DrumKeys";

// const App = function () {
//   <DrumMachine />;
// };

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
