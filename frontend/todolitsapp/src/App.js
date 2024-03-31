
// import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import DataCheck from './components/DataCheck';
function App() {
  return (
    <Routes>
      <Route path="" element={<DataCheck />}></Route>
    </Routes>
  );
}

export default App;
