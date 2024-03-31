
// import './App.css';

import { Routes, Route, Navigate } from 'react-router-dom';
import DataCheck from './components/DataCheck';
import NotesList from './components/NotesList';
import Layout from './components/layout/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<NotesList />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
