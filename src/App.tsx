import Home from './pages/home/Home';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import List from './pages/list/List';
import Login from './pages/login/Login';
import Single from './pages/single/Single';
import New from './pages/new/New';
import './globalStyles/style.scss';
import './globalStyles/darkMode.scss';
import './globalStyles/blueTheme.scss';
import './globalStyles/lightTheme.scss';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { orderInputs, productInputs, userInputs } from './data/formSource';

import { ReactElement, useContext } from 'react';
import { AuthContext } from './context/auth/authContext';
import { ThemeContext } from './context/theme/themeContext';

type ChildrenType = {
  children: ReactElement;
};

function App() {
  const {
    state: { theme },
  } = useContext(ThemeContext);

  const {
    state: { curUser },
  } = useContext(AuthContext);

  const RequireAuth = ({ children }: ChildrenType): ReactElement => {
    return curUser ? children : <Navigate to="/login" />;
  };

  return (
    <div className={'app ' + theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="login"
              element={curUser ? <Navigate to="/" /> : <Login />}
            />
            <Route path="users">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":userId"
                element={
                  <RequireAuth>
                    <Single title="user" />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={userInputs} title="user" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="products">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":productId"
                element={
                  <RequireAuth>
                    <Single title="product" />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={productInputs} title="product" />
                  </RequireAuth>
                }
              />
            </Route>
            <Route path="orders">
              <Route
                index
                element={
                  <RequireAuth>
                    <List />
                  </RequireAuth>
                }
              />
              <Route
                path=":orderId"
                element={
                  <RequireAuth>
                    <Single title="order" />
                  </RequireAuth>
                }
              />
              <Route
                path="new"
                element={
                  <RequireAuth>
                    <New inputs={orderInputs} title="order" />
                  </RequireAuth>
                }
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
