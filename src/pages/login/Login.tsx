import Sidebar from '../../components/sidebar/Sidebar';
import './login.scss';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/auth/authContext';

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
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        setFormData({ ...formData, error: true });
      });
  };
  return (
    <div className="login ">
      <form action="#" onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="email"
            name=""
            id=""
            placeholder="Email"
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            name=""
            id=""
            placeholder="Password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </div>
        <button type="submit">Login</button>
        <span className={error ? 'negative' : 'vis-hidden'}>
          Invalid Credentials
        </span>
      </form>
    </div>
  );
};
export default Login;
