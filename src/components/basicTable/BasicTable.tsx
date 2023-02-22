import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { orders } from '../../data/data';
import { db } from '../../firebase';
import './basicTable.scss';

interface Item {
  [key: string]: string;
}

type BasicTableProps = {
  user?: string;
  product?: string;
};

const BasicTable = ({ user = 'all', product = 'all' }: BasicTableProps) => {
  const [data, setData] = useState<Item[]>([]);
  useEffect(() => {
    // Listen (Realtime Updates)
    const today = new Date();
    const lastMonth = new Date(new Date().setMonth(today.getMonth() - 1));
    const lastMonthQuery = query(
      collection(db, 'orders'),
      where('timestamp', '<=', today),
      where('timestamp', '>', lastMonth)
    );
    const unsub = onSnapshot(lastMonthQuery, (snapshot) => {
      try {
        let list: any = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        if (user !== 'all') {
          list = list.filter((item: any) => item.customer === user);
        }
        if (product !== 'all') {
          list = list.filter((item: any) => item.name === product);
        }
        setData(list);
      } catch (error) {
        console.log(error);
      }
    });
    return () => {
      unsub();
    };
  }, []);
  /* useEffect(() => {
    if (user === 'all') {
      setData(data);
    } else {
      const userOrders = data.filter((item) => item.customer === user);
      setData(userOrders);
    }
  }, [user]); */
  useEffect(() => {}, [product]);
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
        {data.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>
              <div className="flex">
                {order.img && <img src={order.img} alt="" />}
                <span>{order.name}</span>
              </div>
            </td>
            <td>{order.customer}</td>
            <td>{new Date(order.date).toLocaleDateString()}</td>
            <td>{order.amount}</td>
            <td>{order['payment method']}</td>
            {order.status.toLowerCase() === 'approved' && (
              <td>
                <div className="wrapper positive">{order.status}</div>
              </td>
            )}
            {order.status.toLowerCase() === 'declined' && (
              <td>
                <div className="wrapper negative">{order.status}</div>
              </td>
            )}
            {order.status.toLowerCase() === 'pending' && (
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
