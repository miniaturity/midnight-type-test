
import { Route, Routes } from 'react-router';
import './App.css';
import Main from './pages/Main';
import { useTypeTest } from './util/useTypeTest';
import useWords from './util/handleWords';

function App() {
  const s = useTypeTest();
  const w = useWords();
  
  return (
    <div id="app">
      <div id="page">
        <Routes>
          <Route path="/" element={<Main s={s} w={w}/>} />
        </Routes>
      </div>
      
      <footer>
        asdlkajsdlkjasdasdasdadssadadssad
      </footer>
    </div>
  );
}

export default App;
