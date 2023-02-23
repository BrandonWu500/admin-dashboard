import './dataTable.scss';
import { useEffect, useState } from 'react';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';
import { collection, doc, deleteDoc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

interface ItemType {
  [header: string]: string;
}

interface SortDirections {
  [header: string]: string;
}

enum SortingDirection {
  ASCENDING = 'ASCENDING',
  DESCENDING = 'DESCENDING',
  UNSORTED = 'UNSORTED',
}

type DataTableProps = {
  title: string;
};

const DataTable = ({ title }: DataTableProps) => {
  const pluralTitle = title + 's';
  const [data, setData] = useState<ItemType[]>([]);
  const [unsorted, setUnsorted] = useState<ItemType[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [sortDirections, setSortDirections] = useState<SortDirections>({});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [titleText, setTitleText] = useState(pluralTitle);
  useEffect(() => {
    // Single Fetch
    /* const fetchData = async () => {
      let list: any = [];
      try {
        const querySnapshot = await getDocs(collection(db, title));
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        setUnsorted(list);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData(); */

    // Listen (Realtime Updates)
    const unsub = onSnapshot(collection(db, pluralTitle), (snapshot) => {
      try {
        const list: any = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setData(list);
        setUnsorted(list);
      } catch (error) {
        console.log(error);
      }
    });
    return () => {
      unsub();
    };
  }, [pluralTitle]);

  useEffect(() => {
    if (unsorted.length === 0) {
      setTimeout(() => {
        setIsLoading(false);
      }, 6000);
      setTitleText(`No ${pluralTitle} found`);
      setHeaders([]);
      return;
    }
    setTitleText(pluralTitle);

    const { name, img, password, product, timestamp, ...rest } = unsorted[0];

    let order: string[] = [];
    if (title === 'user') {
      order = ['id', 'username', 'email', 'phone', 'address', 'country'];
    } else if (title === 'product') {
      order = ['id', 'price', 'category', 'description', 'stock'];
    } else if (title === 'order') {
      order = ['id', 'customer', 'date', 'amount', 'payment method', 'status'];
    }
    const sortedHeaders = Object.keys(JSON.parse(JSON.stringify(rest, order)));

    let newHeaders: string[] = [
      ...sortedHeaders.slice(0, 1),
      title,
      ...sortedHeaders.slice(1),
    ];

    const obj: SortDirections = {};
    newHeaders.forEach((header: string) => {
      obj[header] = 'UNSORTED';
    });

    setHeaders(newHeaders);
    setSortDirections(obj);
    setIsLoading(false);
  }, [unsorted, title, pluralTitle]);

  const handleSort = (header: string) => {
    let newData = [...data];
    if (sortDirections[header] === SortingDirection.UNSORTED) {
      sortDirections[header] = SortingDirection.ASCENDING;
      newData.sort((a: ItemType, b: ItemType) => {
        const filteredHeader = header === title ? 'name' : header;
        const valA: string = a[filteredHeader].toLowerCase();
        const valB: string = b[filteredHeader].toLowerCase();

        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
      });
    } else if (sortDirections[header] === SortingDirection.ASCENDING) {
      sortDirections[header] = SortingDirection.DESCENDING;
      newData.sort((a: ItemType, b: ItemType) => {
        const filteredHeader = header === title ? 'name' : header;
        const valA: string = a[filteredHeader].toLowerCase();
        const valB: string = b[filteredHeader].toLowerCase();

        if (valA > valB) return -1;
        if (valA < valB) return 1;
        return 0;
      });
    } else {
      sortDirections[header] = SortingDirection.UNSORTED;
      newData = [...unsorted];
    }
    setData(newData);
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDoc(doc(db, pluralTitle, id));
      const newData = data.filter((val) => val.id !== id);
      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="dataTable ">
      {isLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <header className="top">
            <h1>{titleText}</h1>
            <Link to={`/${pluralTitle}/new`}>
              <button className="positive">Add {title}</button>
            </Link>
          </header>
          <table>
            <thead>
              <tr>
                {headers?.map((header: string, headerIdx) => (
                  <th key={headerIdx} onClick={() => handleSort(header)}>
                    <button className="flex flex-left">
                      {header === 'id' ? header.toUpperCase() : header}
                      {sortDirections[header] === SortingDirection.UNSORTED && (
                        <KeyboardArrowUpIcon className="unsorted" />
                      )}
                      {sortDirections[header] ===
                        SortingDirection.ASCENDING && <KeyboardArrowUpIcon />}
                      {sortDirections[header] ===
                        SortingDirection.DESCENDING && (
                        <KeyboardArrowDownIcon />
                      )}
                    </button>
                  </th>
                ))}
                {unsorted.length > 0 && <th className="unsortable">Action</th>}
              </tr>
            </thead>
            <tbody>
              {data?.map((item: any) => (
                <tr key={item.id}>
                  {headers?.map((header: string, headerIdx) => {
                    if (header === title) {
                      return (
                        <td key={headerIdx}>
                          <div className="name-img">
                            {item.img && (
                              <img src={item.img} alt="" className="profile" />
                            )}
                            <span>{item.name}</span>
                          </div>
                        </td>
                      );
                    } else if (header === 'status') {
                      if (item[header]?.toLowerCase() === 'approved') {
                        return (
                          <td key={headerIdx}>
                            <div className="positive wrapper">
                              {item[header]}
                            </div>
                          </td>
                        );
                      } else if (item[header]?.toLowerCase() === 'declined') {
                        return (
                          <td key={headerIdx}>
                            <div className="negative wrapper">
                              {item[header]}
                            </div>
                          </td>
                        );
                      } else if (item[header]?.toLowerCase() === 'pending') {
                        return (
                          <td key={headerIdx}>
                            <div className="neutral wrapper">
                              {item[header]}
                            </div>
                          </td>
                        );
                      }
                    } else if (header === 'date') {
                      return (
                        <td key={headerIdx}>
                          <div className="td-wrapper">
                            {new Date(item[header]).toLocaleDateString()}
                          </div>
                        </td>
                      );
                    }

                    return (
                      <td key={headerIdx}>
                        <div className="td-wrapper">{item[header]}</div>
                      </td>
                    );
                  })}
                  <td>
                    <div className="flex flex-left action">
                      <Link to={`/${pluralTitle}/${item.id}`}>
                        <button className="text-accent">View</button>
                      </Link>
                      <button
                        className="text-negative"
                        onClick={() => handleDelete(item.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};
export default DataTable;
