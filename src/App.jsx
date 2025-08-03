import FlipCard from "./Cards/FlipCard";
import { Routes, Route } from "react-router-dom";
import Writing from "./Pages/writing/Writing";
import VocabularyApp from "./Pages/memorizing/Mem";
import ThisDayCard from "./Pages/memorizing/ThisDatCard";
import AddCardForm from "./Pages/memorizing/AddCard";

function App() {
  return (
    <div className="min-h-screen  flex justify-center items-center">
      <Routes>
        <Route path="/" element={<AddCardForm />} />
        {/* <Route path="/writing" element={<Writing />} />
        <Route path="/mem" element={<VocabularyApp />} /> */}
      </Routes>
    </div>
  );
}

export default App;
