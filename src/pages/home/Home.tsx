import BasicTable from '../../components/basicTable/BasicTable';
import Card from '../../components/card/Card';
import Chart from '../../components/chart/Chart';
import Featured from '../../components/featured/Featured';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import { homeCards } from '../../data/data';
import './home.scss';

const Home = () => {
  return (
    <div className="home page">
      <div className="left">
        <Sidebar />
      </div>
      <main className="right">
        <Topbar />
        <ul className="cards">
          {homeCards.map((card, idx) => (
            <Card key={idx} {...card} />
          ))}
        </ul>
        <section className="charts">
          <Featured />
          <Chart aspect={2 / 1} title="Last 6 Months (Revenue in $)" />
        </section>
        <section className="tables shadow">
          <h2>Latest Orders</h2>
          <BasicTable />
        </section>
      </main>
    </div>
  );
};
export default Home;
