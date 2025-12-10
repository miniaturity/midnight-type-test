
import { Route, Routes } from 'react-router';
import './App.css';
import Main from './pages/Main';
import { useTypeTest } from './hooks/useTypeTest';

function App() {
  const s = useTypeTest();
  
  return (
    <div id="app">
      <div id="page">
        <Routes>
          <Route path="/" element={<Main s={{...s}}/>} />
        </Routes>
      </div>
      
      <footer>
        asdlkajsdlkjasdasdasdadssadadssad
      </footer>
    </div>
  );
}

export default App;
