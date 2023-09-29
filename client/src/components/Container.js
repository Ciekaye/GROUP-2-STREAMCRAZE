import "./Container.css";
import { useNavigate } from 'react-router-dom';

const Container = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  }
  return (
    <div className="nav-bar">
      <img className="nav-bar-child" alt="" src="/rectangle-185@2x.png" />
      <div className="home1">Home</div>
      <div className="logout" onClick={handleLogout}>Logout</div>
      <img className="film-icon" alt="" src="/film.svg" />
      <img className="log-out-icon" alt="" src="/logout.svg" />
      <img className="nav-bar-item" alt="" src="/rectangle-222@2x.png" />
    </div>
  );
};

export default Container;
