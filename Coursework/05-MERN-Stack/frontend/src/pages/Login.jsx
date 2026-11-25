import { useState, useEffect } from 'react';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import Spinner from '../components/Spinner';
const Login = ({ user, setUser }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { email, password } = formData;
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

        try {
        setIsLoading(true);
        const userData = await loginUser({ email, password });
        setUser(userData);
        navigate('/');
        } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
        } finally {
        setIsLoading(false);
        }
    };

  if (isLoading) return <Spinner />;

  return (
    <>
        <section className="heading">
            <h1>
            <FaSignInAlt /> Login
            </h1>
            <p>Login and start setting some goals</p>
        </section>

      {error && <div className="error-msg">{error}</div>}

        <section className="form">
            <form onSubmit={onSubmit}>
            <div className="form-group">
                <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="Enter your email"
                onChange={onChange}
                />
            </div>
          <div className="form-group">
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              placeholder="Enter password"
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default Login;