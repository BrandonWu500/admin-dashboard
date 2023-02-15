import { useEffect, useState } from 'react';
import { orders } from '../../data';
import './basicTable.scss';

interface User {
  id: number;
  product: string;
  img: string;
  customer: string;
  date: string;
  amount: number;
  method: string;
  status: string;
}

type BasicTableProps = {
  user?: string;
};

const BasicTable = ({ user = 'all' }: BasicTableProps) => {
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    if (user === 'all') {
      setUsers(orders);
    } else {
      const userOrders = orders.filter((order) => order.customer === user);
      setUsers(userOrders);
    }
  }, [user]);
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
        {users.map((order) => (
          <tr key={order.id}>
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
