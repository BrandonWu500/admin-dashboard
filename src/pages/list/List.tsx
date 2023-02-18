import { useLocation } from 'react-router-dom';
import DataTable from '../../components/dataTable/DataTable';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';

const List = () => {
  const location = useLocation();
  const title = location.pathname.slice(1);
  return (
    <div className="list page">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <Topbar />
        <DataTable title={title} />
      </div>
    </div>
  );
};
export default List;
