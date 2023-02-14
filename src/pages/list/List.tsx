import DataTable from '../../components/dataTable/DataTable';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';

const List = () => {
  return (
    <div className="list page">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <Topbar />
        <DataTable />
      </div>
    </div>
  );
};
export default List;
