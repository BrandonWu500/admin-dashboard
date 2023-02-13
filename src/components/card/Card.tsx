import './card.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

type CardProps = {
  title: string;
  num: number;
  changePercent: number;
};

const Card = ({ title, num, changePercent }: CardProps) => {
  return (
    <div className="card">
      <div className="row">
        <h3>{title}</h3>
        <div
          className={
            changePercent >= 0 ? 'change text-positive' : 'change text-negative'
          }
        >
          {changePercent >= 0 ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )}
          <span>
            {changePercent >= 0
              ? `+ ${changePercent} %`
              : `- ${Math.abs(changePercent)} %`}
          </span>
        </div>
      </div>
      <div className="row">
        <p className="number">
          {title === 'EARNINGS' || title === 'MY BALANCE'
            ? '$ ' + num.toLocaleString()
            : num.toLocaleString()}
        </p>
      </div>
      <div className="row">
        <span className="link">View</span>
        {title === 'USERS' && <PersonIcon className="icon negative" />}
        {title === 'ORDERS' && <ShoppingCartIcon className="icon neutral" />}
        {title === 'EARNINGS' && <PaidIcon className="icon positive" />}
        {title === 'MY BALANCE' && (
          <AccountBalanceWalletIcon className="icon accent" />
        )}
      </div>
    </div>
  );
};
export default Card;
