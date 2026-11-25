import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/api';

const Header = ({ user, setUser }) => {
  const navigate = useNavigate();

  const onLogout = () => {
    logoutUser();
    setUser(null);
    navigate('/login');
  };

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">GoalSetter App</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className="btn" onClick={onLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to="/register">
                <FaUser /> Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Header;