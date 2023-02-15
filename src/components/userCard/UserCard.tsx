import { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import UserCardRow from '../userCardRow/UserCardRow';
import './userCard.scss';

export interface Info {
  /* email?: string;
  phone?: string;
  address?: string;
  country?: string; */
  [key: string]: string;
}

export interface DictRefs {
  [key: string]: HTMLInputElement | HTMLTextAreaElement;
}

const dummyUser: Info = {
  email: 'janedoe@gmail.com',
  phone: '(+1)123-456-789',
  address: '123 Baker St, Boston, MA',
  country: 'United States',
};

const UserCard = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [info, setInfo] = useState<Info>({});
  const inputRefs = useRef<DictRefs>({});

  useEffect(() => {
    setInfo(dummyUser);
    resetInfo();
  }, []);

  const handleSave = () => {
    const obj: Info = { ...info };
    let earlyReturn = false;
    Object.entries(inputRefs?.current).map(([key, val]) => {
      if (val.value) {
        obj[key] = val.value;
      } else {
        earlyReturn = true;
        toast.error('You need to fill out all inputs before saving.');
      }
    });
    if (!earlyReturn) {
      setInfo(obj);
      setIsEditing(!isEditing);
    }
  };

  const resetInfo = () => {
    Object.entries(info).map(([key, val]) => {
      if (inputRefs.current[key]?.value) {
        inputRefs.current[key].value = val;
      }
    });
    setIsEditing(false);
  };
  return (
    <div className="userCard">
      {/* <div className={isEditing ? 'overlay' : 'hidden'}>
        <div className="form flex flex-col g-2">
          <h2>Edit Information</h2>
          {Object.entries(info).map(([infoKey, infoVal]: [string, string]) => (
            <div className="input-group flex" key={infoKey}>
              <h3>{infoKey}</h3>
              <input
                type="text"
                name={infoKey}
                id=""
                defaultValue={infoVal}
                ref={(ref: HTMLInputElement) =>
                  (inputRefs.current[infoKey] = ref)
                }
              />
            </div>
          ))}
          <div className="btns">
            <button
              className={isEditing ? 'positive' : 'vis-hidden'}
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className={isEditing ? 'negative' : 'vis-hidden'}
              onClick={resetInfo}
            >
              Cancel
            </button>
          </div>
        </div>
      </div> */}
      <section className="info shadow">
        <button
          className="edit accent"
          onClick={() => setIsEditing(!isEditing)}
        >
          Edit
        </button>
        <div className="top">
          <h2>Information</h2>
        </div>
        <div className="bot">
          <img src="/images/people/2.jpg" alt="" className="profile-lg" />
          <div className="text">
            <h1>Jane Doe</h1>
            {Object.entries(info).map(
              ([infoKey, infoVal]: [string, string]) => (
                <UserCardRow
                  key={infoKey}
                  isEditing={isEditing}
                  inputRefs={inputRefs}
                  infoKey={infoKey}
                  infoVal={infoVal}
                />
              )
            )}
          </div>
        </div>
        <div className="btns">
          <button
            className={isEditing ? 'positive' : 'vis-hidden'}
            onClick={handleSave}
          >
            Save
          </button>
          <button
            className={isEditing ? 'negative' : 'vis-hidden'}
            onClick={resetInfo}
          >
            Cancel
          </button>
        </div>
      </section>
    </div>
  );
};
export default UserCard;
