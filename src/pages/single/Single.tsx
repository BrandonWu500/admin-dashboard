import BasicTable from '../../components/basicTable/BasicTable';
import Chart from '../../components/chart/Chart';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import UserCard from '../../components/userCard/UserCard';
import './single.scss';

const Single = () => {
  return (
    <div className="single page">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <Topbar />
        <div className="flex flex-left g-3">
          <UserCard />
          <section className="charts">
            <Chart aspect={2 / 1} title="User Spending ( Last 6 Months)" />
          </section>
        </div>
        <section className="tables">
          <h2>Latest User Orders</h2>
          <BasicTable user="Jane Doe" />
        </section>
      </div>
    </div>
  );
};
export default Single;
