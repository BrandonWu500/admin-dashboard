import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import BasicTable from '../../components/basicTable/BasicTable';
import Chart from '../../components/chart/Chart';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import UserCard from '../../components/userCard/UserCard';
import { db } from '../../firebase';
import './single.scss';

type ItemType = {
  [key: string]: string;
};

type SingleProps = {
  title: string;
};

const Single = ({ title }: SingleProps) => {
  const [chartTitle, setChartTitle] = useState('');
  const [tableTitle, setTableTitle] = useState('');
  const [item, setItem] = useState<ItemType>({});
  const [isLoading, setIsLoading] = useState(true);
  const pluralTitle = title + 's';
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  useEffect(() => {
    if (title === 'user') {
      setChartTitle('User Spending (Last 6 Months)');
      setTableTitle('Latest User Orders');
    } else if (title === 'product') {
      setChartTitle('Product Revenue (Last 6 Months)');
      setTableTitle('Latest Product Sales');
    }
  }, [title]);
  useEffect(() => {
    const fetchItem = async () => {
      try {
        const docRef = doc(db, pluralTitle, id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setItem(docSnap.data());
          setIsLoading(false);
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchItem();
  }, [id, pluralTitle]);
  return (
    <div className="single page">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <Topbar />
        {isLoading ? (
          <h1 className="text-center">Loading...</h1>
        ) : (
          <>
            {title === 'order' ? (
              <div className="flex">
                <UserCard item={item} id={id} title={title} />
              </div>
            ) : (
              <>
                <div className="flex flex-left g-3">
                  <UserCard item={item} id={id} title={title} />
                  <section className="charts">
                    <Chart aspect={2 / 1} title={chartTitle} />
                  </section>
                </div>
                <section className="tables">
                  <h2>{tableTitle}</h2>
                  {title === 'user' && <BasicTable user={item.name} />}
                  {title === 'product' && <BasicTable product={item.name} />}
                </section>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default Single;
