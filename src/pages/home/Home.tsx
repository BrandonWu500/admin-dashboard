import Card from '../../components/card/Card';
import Navbar from '../../components/navbar/Navbar';
import Sidebar from '../../components/sidebar/Sidebar';
import { homeCards } from '../../data';
import './home.scss';

const Home = () => {
  return (
    <div className="home">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <Navbar />
        <ul className="cards">
          {homeCards.map((card, idx) => (
            <Card key={idx} {...card} />
          ))}
        </ul>
      </div>
    </div>
  );
};
export default Home;
