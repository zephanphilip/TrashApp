import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Startup from "./components/Startup"
import Reviews from './components/Reviews';
import Slots from './components/Slots';
import ChatSupport from './components/ChatSupport';
import WasteCollection from './components/WasteCollection';


function App() {

  return (
    <Router>
    <Routes>
      
      <Route path="/" element={<Startup/>}/>
      <Route path="/reviews" element={<Reviews/>}/>
      <Route path="/slots" element={<Slots/>}/>
      <Route path='/wastecollection' element={<WasteCollection/>}/>
      <Route path='/chatsupport' element={<ChatSupport/>}/>


    </Routes>
    </Router>
  )
}

export default App
