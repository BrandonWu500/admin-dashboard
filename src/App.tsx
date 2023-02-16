import Home from './pages/home/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import List from './pages/list/List';
import Login from './pages/login/Login';
import Single from './pages/single/Single';
import New from './pages/new/New';
import './globalStyles/style.scss';
import './globalStyles/darkMode.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { productInputs, userInputs } from './data/formSource';

function App() {
  return (
    <div className="dark">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route element={<Login />} />
            <Route path="users">
              <Route index element={<List />} />
              <Route path=":userId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={userInputs} title="Add New User" />}
              />
            </Route>
            <Route path="products">
              <Route index element={<List />} />
              <Route path=":productId" element={<Single />} />
              <Route
                path="new"
                element={<New inputs={productInputs} title="Add New Product" />}
              />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
}

export default App;
