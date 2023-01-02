import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import About from "./pages/About";

function App() {
    
  return (
    <Routes>
       <Route path="/" element={<Homepage/>}/>
       <Route path="/:smth" element= {<About/>}/>
    </Routes>
  );
}

export default App;
