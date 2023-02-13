import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import StoreIcon from '@mui/icons-material/Store';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import AssessmentIcon from '@mui/icons-material/Assessment';
import NotificationsIcon from '@mui/icons-material/Notifications';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import './sidebar.scss';

const Sidebar = () => {
  return (
    <nav className="sidebar">
      <div className="top">
        <h2 className="logo">SHOP</h2>
      </div>
      <div className="center">
        <ul>
          <h4>MAIN</h4>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <h4>LISTS</h4>
          <li>
            <PersonIcon className="icon" />
            <span>Users</span>
          </li>
          <li>
            <StoreIcon className="icon" />
            <span>Products</span>
          </li>
          <li>
            <CreditCardIcon className="icon" />
            <span>Orders</span>
          </li>
          <h4>USEFUL</h4>
          <li>
            <AssessmentIcon className="icon" />
            <span>Stats</span>
          </li>
          <li>
            <NotificationsIcon className="icon" />
            <span>Notifications</span>
          </li>
          <h4>SERVICE</h4>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>System Health</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Logs</span>
          </li>
          <li>
            <SettingsApplicationsIcon className="icon" />
            <span>Settings</span>
          </li>
          <h4>USER</h4>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Profile</span>
          </li>
          <li>
            <ExitToAppIcon className="icon" />
            <span>Logout</span>
          </li>
        </ul>
      </div>
    </nav>
  );
};
export default Sidebar;
