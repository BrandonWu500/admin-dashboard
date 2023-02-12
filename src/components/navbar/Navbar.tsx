import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import './navbar.scss';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="left">
        <div className="search">
          <input type="text" placeholder="Search..." />
          <button>
            <SearchIcon fontSize="small" />
          </button>
        </div>
      </div>
      <div className="right">
        <ul>
          <li>
            <LanguageIcon />
            <span>English</span>
          </li>
          <li>
            <DarkModeIcon />
            <span>Dark Mode</span>
          </li>
          <li>
            <NotificationsIcon />
          </li>
          <li>
            <ChatIcon />
          </li>
          <li>
            <img src="/images/people/1.jpg" alt="" className="profile" />
          </li>
          <li>
            <SettingsIcon />
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Navbar;
