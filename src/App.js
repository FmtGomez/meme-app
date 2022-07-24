import './App.css';
import {Route, Routes} from "react-router-dom";
import {Home} from "./pages/Home.js";
import {UseMeme} from "./pages/UseMeme.js";
 

function App() {
  return (
   <Routes>
    <Route path='/' element={<Home/>} />
    <Route path="/generated" element={<UseMeme/>}/>
   </Routes>
  );
}

export default App;
