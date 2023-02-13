import { orders } from '../../data';
import './basicTable.scss';

const BasicTable = () => {
  return (
    <table className="basicTable">
      <thead>
        <tr>
          <th>Order ID</th>
          <th className="text-center">Product</th>
          <th>Customer</th>
          <th>Date</th>
          <th>Amount</th>
          <th>Payment Method</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr>
            <td>{order.id}</td>
            <td>
              <div className="flex">
                <img src={order.img} alt="" />
                <span>{order.product}</span>
              </div>
            </td>
            <td>{order.customer}</td>
            <td>{order.date}</td>
            <td>{order.amount}</td>
            <td>{order.method}</td>
            {order.status === 'Approved' && (
              <td>
                <div className="wrapper positive">{order.status}</div>
              </td>
            )}
            {order.status === 'Pending' && (
              <td>
                <div className="wrapper neutral">{order.status}</div>
              </td>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default BasicTable;
