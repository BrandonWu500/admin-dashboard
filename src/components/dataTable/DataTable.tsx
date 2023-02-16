import './dataTable.scss';
import { useEffect, useState } from 'react';
import { users as dummyData } from '../../data/data';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Link } from 'react-router-dom';

interface User {
  id: number;
  name: string;
  img: string;
  email: string;
  age: number;
  status: string;
  [header: string]: string | number;
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
  const [users, setUsers] = useState<User[]>([]);
  const [unsorted, setUnsorted] = useState<User[]>([]);
  const [headers, setHeaders] = useState<string[]>([]);
  const [sortDirections, setSortDirections] = useState<SortDirections>({});
  useEffect(() => {
    const { name, img, ...rest } = dummyData[0];
    setUsers(dummyData);
    setUnsorted(dummyData);
    let newHeaders: string[] = [
      ...Object.keys(rest).slice(0, 1),
      'user',
      ...Object.keys(rest).slice(1),
    ];
    newHeaders = [
      ...newHeaders.filter((header: string) => header !== 'status'),
      'status',
    ];
    const obj: SortDirections = {};
    newHeaders.forEach((header: string) => {
      const filteredHeader = header === 'name' ? 'user' : header;
      obj[filteredHeader] = 'UNSORTED';
    });
    setHeaders(newHeaders);
    setSortDirections(obj);
  }, []);

  const handleSort = (header: string) => {
    let newUsers = [...users];
    if (sortDirections[header] === SortingDirection.UNSORTED) {
      sortDirections[header] = SortingDirection.ASCENDING;
      newUsers.sort((a: User, b: User) => {
        const filteredHeader = header === 'user' ? 'name' : header;
        const valA: string | number = a[filteredHeader];
        const valB: string | number = b[filteredHeader];

        if (valA < valB) return -1;
        if (valA > valB) return 1;
        return 0;
      });
    } else if (sortDirections[header] === SortingDirection.ASCENDING) {
      sortDirections[header] = SortingDirection.DESCENDING;
      newUsers.sort((a: User, b: User) => {
        const filteredHeader = header === 'user' ? 'name' : header;
        const valA: string | number = a[filteredHeader];
        const valB: string | number = b[filteredHeader];

        if (valA > valB) return -1;
        if (valA < valB) return 1;
        return 0;
      });
    } else {
      sortDirections[header] = SortingDirection.UNSORTED;
      newUsers = [...unsorted];
    }
    setUsers(newUsers);
  };

  const handleDelete = (userToDelete: User) => {
    const newUsers = users.filter((user) => user !== userToDelete);
    setUsers(newUsers);
  };
  return (
    <div className="dataTable shadow">
      <header className="top">
        <h1>{title}</h1>
        <Link to={`/${title}/new`}>
          <button className="positive">Add {title.slice(0, -1)}</button>
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
                  {sortDirections[header] === SortingDirection.ASCENDING && (
                    <KeyboardArrowUpIcon />
                  )}
                  {sortDirections[header] === SortingDirection.DESCENDING && (
                    <KeyboardArrowDownIcon />
                  )}
                </button>
              </th>
            ))}
            <th className="unsortable">Action</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user: any) => (
            <tr key={user.id}>
              {headers?.map((header: string, headerIdx) => {
                if (header === 'user') {
                  return (
                    <td key={headerIdx} className="flex flex-left">
                      <img src={user.img} alt="" className="profile" />
                      <span>{user.name}</span>
                    </td>
                  );
                } else if (header === 'status') {
                  if (user[header] === 'active') {
                    return (
                      <td key={headerIdx}>
                        <div className="positive wrapper">{user[header]}</div>
                      </td>
                    );
                  } else if (user[header] === 'passive') {
                    return (
                      <td key={headerIdx}>
                        <div className="negative wrapper">{user[header]}</div>
                      </td>
                    );
                  } else if (user[header] === 'pending') {
                    return (
                      <td key={headerIdx}>
                        <div className="neutral wrapper">{user[header]}</div>
                      </td>
                    );
                  }
                }

                return <td key={headerIdx}>{user[header]}</td>;
              })}
              <td>
                <div className="flex action">
                  <Link to="/users/test">
                    <button className="text-accent">View</button>
                  </Link>
                  <button
                    className="text-negative"
                    onClick={() => handleDelete(user)}
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default DataTable;
