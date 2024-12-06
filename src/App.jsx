import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./components/HomePage";
import Details from "./components/Details";
import MyHeader from "./components/MyHeader";

function App() {
  return (
    <BrowserRouter>
      <MyHeader />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:city" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
