import './card.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PaidIcon from '@mui/icons-material/Paid';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useEffect, useState } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

type CardProps = {
  title: string;
  dynamic: boolean;
  num: number;
  changePercent: number;
};

const Card = ({
  title,
  dynamic,
  num: staticNum,
  changePercent: staticChangePercent,
}: CardProps) => {
  const [num, setNum] = useState(0);
  const [changePercent, setChangePercent] = useState(0);
  const queryTitle = title.toLowerCase();
  useEffect(() => {
    const fetchData = async () => {
      const today = new Date();
      const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
      const prevMonth = new Date(new Date().setMonth(today.getMonth() - 2));

      const lastMonthQuery = query(
        collection(db, queryTitle),
        where('timestamp', '<=', today),
        where('timestamp', '>', lastMonth)
      );
      const prevMonthQuery = query(
        collection(db, queryTitle),
        where('timestamp', '<=', lastMonth),
        where('timestamp', '>', prevMonth)
      );

      const lastMonthData = await getDocs(lastMonthQuery);
      const prevMonthData = await getDocs(prevMonthQuery);

      setNum(lastMonthData.docs.length);

      // to prevent infinity
      const prevLength =
        prevMonthData.docs.length === 0 ? 1 : prevMonthData.docs.length;
      const changeNum =
        ((lastMonthData.docs.length - prevMonthData.docs.length) / prevLength) *
        100;
      const changeString = changeNum.toFixed(0);
      setChangePercent(Number(changeString));
    };
    if (dynamic) {
      dynamic && fetchData();
    } else {
      setNum(staticNum);
      setChangePercent(staticChangePercent);
    }
  }, []);
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
        {dynamic ? (
          <Link to={`/${title.toLowerCase()}`}>
            <span className="link">View</span>
          </Link>
        ) : (
          <span className="link">View</span>
        )}

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
