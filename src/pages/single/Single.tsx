import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import './single.scss';

const Single = () => {
  return (
    <div className="single page">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <Topbar />
        <section className="info">
          <div className="top">
            <h2>Information</h2>
          </div>
          <div className="bot">
            <img src="/images/people/2.jpg" alt="" className="profile-lg" />
            <div className="text">
              <h1>Jane Doe</h1>
              <div className="row">
                <h3>Email:</h3>
                <span>janedoe@gmail.com</span>
              </div>
              <div className="row">
                <h3>Phone:</h3>
                <span>(+1)123-456-789</span>
              </div>
              <div className="row">
                <h3>Address:</h3>
                <span>123 Baker St, Boston, MA</span>
              </div>
              <div className="row">
                <h3>Country:</h3>
                <span>United States</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
export default Single;
