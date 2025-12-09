
import { Route, Routes } from 'react-router';
import './App.css';
import Main from './pages/Main';

function App() {
  return (
    <div>


      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
      
    </div>
  );
}

export default App;
