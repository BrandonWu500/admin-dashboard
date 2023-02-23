import './login.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/authContext';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useDarkMode } from '../../context/darkMode/darkModeContext';

type FormDataType = {
  email: string;
  password: string;
  error: boolean;
};

const Login = () => {
  const [formData, setFormData] = useState<FormDataType>({
    email: '',
    password: '',
    error: false,
  });
  const { email, password, error } = formData;
  const navigate = useNavigate();
  const { toggleModes } = useDarkMode();

  const { login } = useContext(AuthContext);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        login(user);
        // ...
        navigate('/');
      })
      .catch((error) => {
        // ..
        setFormData({ ...formData, error: true });
      });
  };
  return (
    <div className="login">
      <form action="#" onSubmit={handleSubmit}>
        <header>
          <div className="flex flex-col">
            <button
              type="button"
              onClick={toggleModes}
              className="btn-dispatch"
            >
              <DarkModeIcon />
              <span>Dark Mode</span>
            </button>
            <h1>SHOP</h1>
          </div>
          <h2>Admin Dashboard</h2>
        </header>
        <div className="input-group">
          <input
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <button type="submit" className="positive">
          Login
        </button>
        <span className={error ? 'negative' : 'vis-hidden'}>
          Invalid Credentials
        </span>
      </form>
    </div>
  );
};
export default Login;
