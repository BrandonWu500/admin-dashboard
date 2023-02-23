import './chart.scss';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { useContext } from 'react';
import { ThemeContext } from '../../context/theme/themeContext';

const data = [
  { name: 'January', Total: 1200 },
  { name: 'February', Total: 2100 },
  { name: 'March', Total: 800 },
  { name: 'April', Total: 1600 },
  { name: 'May', Total: 900 },
  { name: 'June', Total: 1700 },
];

type ChartProps = {
  aspect: number;
  title: string;
};

const Chart = ({ aspect, title }: ChartProps) => {
  const {
    state: { theme },
  } = useContext(ThemeContext);
  return (
    <div className="chart shadow">
      <h2>{title}</h2>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="5%"
                stopColor="#8884d8"
                stopOpacity={0.8}
                className="chartGrid"
              />
              <stop
                offset="95%"
                stopColor="#8884d8"
                stopOpacity={0}
                className="chartGrid"
              />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="name"
            stroke={theme === 'blue' ? 'white' : 'gray'}
            className="chartGrid"
          />
          <YAxis
            dataKey="Total"
            stroke={theme === 'blue' ? 'white' : 'gray'}
            className="chartGrid"
          />
          <CartesianGrid strokeDasharray="3 3" className="chartGrid" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="Total"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
            className="chartGrid"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
export default Chart;
