import './card.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

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
          className={changePercent >= 0 ? 'change positive' : 'change negative'}
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
        <p className="number">{num}</p>
      </div>
      <div className="row"></div>
    </div>
  );
};
export default Card;
