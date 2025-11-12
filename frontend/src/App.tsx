import { BrowserRouter, Routes, Route } from "react-router-dom";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Search />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
