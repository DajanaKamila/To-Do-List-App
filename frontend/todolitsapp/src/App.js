import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route } from 'react-router-dom';
import TasksPage from './components/full-pages/TasksPage';
import TaskDetailsPage from './components/full-pages/TaskDetailsPage';
import Layout from './components/layout/Layout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TasksPage />}></Route>
        <Route path=":id/details" element={<TaskDetailsPage />} />
      </Route>
    </Routes>

    <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
    </div>


  );
}

export default App;
