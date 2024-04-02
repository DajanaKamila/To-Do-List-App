import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotesPage from './components/NotesPage';
import Layout from './components/layout/Layout';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="app">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<NotesPage />}></Route>
      </Route>
    </Routes>
      {/* <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        /> */}
    </div>


  );
}

export default App;
