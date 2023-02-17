import './featured.scss';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const Featured = () => {
  return (
    <div className="featured">
      <div className="row">
        <h2>Total Revenue</h2>
        <MoreVertIcon />
      </div>
      <div className="row col">
        <div className="featured-chart">
          <CircularProgressbar value={70} text={'70%'} />
        </div>
        <p>Total sales made today</p>
        <p className="number">$400</p>
        <small>
          Previous transactions processing. Last payments may not be included.
        </small>
      </div>
      <div className="row">
        <ul>
          <li>
            <h3>Target</h3>
            <p className="text-positive">
              <KeyboardArrowDownIcon />$ 12.4k
            </p>
          </li>
          <li>
            <h3>Last Week</h3>
            <p className="text-negative">
              <KeyboardArrowUpIcon />$ 12.4k
            </p>
          </li>
          <li>
            <h3>Last Month</h3>
            <p className="text-positive">
              <KeyboardArrowDownIcon />$ 12.4k
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Featured;
