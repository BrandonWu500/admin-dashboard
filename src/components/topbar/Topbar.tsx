import SearchIcon from '@mui/icons-material/Search';
import LanguageIcon from '@mui/icons-material/Language';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ChatIcon from '@mui/icons-material/Chat';
import SettingsIcon from '@mui/icons-material/Settings';
import './topbar.scss';
import { useDarkMode } from '../../context/darkModeContext';

const Topbar = () => {
  const { darkMode, toggleModes } = useDarkMode();
  return (
    <div className="topbar">
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
            {darkMode ? (
              <button onClick={toggleModes}>
                <LightModeIcon />
                <span>Light Mode</span>
              </button>
            ) : (
              <button onClick={toggleModes}>
                <DarkModeIcon />
                <span>Dark Mode</span>
              </button>
            )}
          </li>
          <li>
            <NotificationsIcon />
            <span className="badge">1</span>
          </li>
          <li>
            <ChatIcon />
            <span className="badge">2</span>
          </li>
          <li>
            <img src="/images/people/1.jpg" alt="" className="profile" />
          </li>
          <li>
            <SettingsIcon />
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Topbar;
