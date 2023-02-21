import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { db, storage } from '../../firebase';
import { uploadFile } from '../../helperFunctions/helperFunctions';
import ImagePreview from '../imagePreview/ImagePreview';
import ImageUpload from '../imageUpload/ImageUpload';
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

/* class InfoClass {
  email: string;
  phone: string;
  address: string;
  country: string;

  constructor(email: string, phone: string, address: string, country: string) {
    this.email = email;
    this.phone = phone;
    this.address = address;
    this.country = country;
  }
  toObj() {
    return {
      email: this.email,
      phone: this.phone,
      address: this.address,
      country: this.country,
    };
  }
}

// Firestore data converter
const infoConverter = {
  toFirestore: (info: InfoClass) => {
    return {
      email: info.email,
      phone: info.phone,
      address: info.address,
      country: info.country,
    };
  },
  fromFirestore: (snapshot: any, options: any) => {
    const data = snapshot.data(options);
    return new InfoClass(data.email, data.phone, data.address, data.country);
  },
}; */

const UserCard = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [info, setInfo] = useState<Info>({});
  const [initInfo, setInitInfo] = useState<Info>({});
  const [infoInputs, setInfoInputs] = useState<Info>({});
  const [infoInputHeaders, setInfoInputHeaders] = useState<string[]>([]);
  const inputRefs = useRef<DictRefs>({});
  const location = useLocation();
  const category = location.pathname.split('/')[1];
  const id = location.pathname.split('/')[2];
  const [isLoading, setIsLoading] = useState(true);
  const [file, setFile] = useState<any>('');
  const [rdyToSave, setRdyToSave] = useState(true);

  useEffect(() => {
    const fetchInfo = async () => {
      try {
        const docRef = doc(db, category, id);
        /* const docRef = doc(db, category, id).withConverter(infoConverter); */
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        /* const obj = data?.toObj(); */
        if (data) {
          const { password, timestamp, name, img, ...rest } = data;
          setInfo({ name, img });
          setInitInfo({ name, img });
          const order = ['username', 'email', 'phone', 'address', 'country'];
          const sortedHeaders = Object.keys(
            JSON.parse(JSON.stringify(rest, order))
          );
          setInfoInputHeaders(sortedHeaders);
          setInfoInputs(rest);
        }
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchInfo();
  }, []);

  useEffect(() => {
    file && uploadFile(file, setInfo, setRdyToSave);
  }, [file]);

  const handleSave = async () => {
    if (!rdyToSave) {
      return;
    }
    const obj: Info = { ...info };
    Object.entries(inputRefs?.current).map(([key, val]) => {
      if (val.value) {
        obj[key] = val.value;
      } else {
        toast.error('You need to fill out all inputs before saving.');
        throw new Error();
      }
    });
    Object.entries(info).map(([key, val]) => {
      if (!val) {
        toast.error('You need to fill out all inputs before saving.');
        throw new Error();
      }
    });
    await setDoc(doc(db, category, id), obj);
    const { name, img, ...rest } = obj;
    setInfoInputs(rest);
    setInfo({ name, img });
    setInitInfo({ name, img });
    setIsEditing(!isEditing);
  };

  const resetInfo = () => {
    Object.entries(infoInputs).map(([key, val]) => {
      inputRefs.current[key].value = val;
    });
    setInfo(initInfo);
    setFile('');
    setIsEditing(false);
  };

  /*  useEffect(() => {
    setInfo({ ...info, img: file.toString() });
  }, [file]); */
  return (
    <div className="userCard">
      <section className="info shadow">
        {isLoading ? (
          <h1>Loading...</h1>
        ) : (
          <>
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
              <div className="text">
                <div className="wrapper">
                  {isEditing ? (
                    <div className="flex-col">
                      <ImagePreview file={file} />
                      <ImageUpload setFile={setFile} />
                    </div>
                  ) : (
                    <img
                      src={info.img ?? '/images/people/blank.png'}
                      alt=""
                      className="profile-xl"
                    />
                  )}
                  {isEditing ? (
                    <input
                      type="text"
                      className="input-title"
                      onChange={(e) =>
                        setInfo({ ...info, name: e.target.value })
                      }
                      defaultValue={info.name}
                    />
                  ) : (
                    <h1>{info.name}</h1>
                  )}
                </div>
                {infoInputHeaders.map((infoKey: string) => (
                  <UserCardRow
                    key={infoKey}
                    isEditing={isEditing}
                    inputRefs={inputRefs}
                    infoKey={infoKey}
                    infoVal={infoInputs[infoKey]}
                  />
                ))}
              </div>
            </div>
            <div className="btns">
              <button
                className={isEditing && rdyToSave ? 'positive' : 'hidden'}
                onClick={handleSave}
                disabled={!rdyToSave}
              >
                Save
              </button>
              <button
                className={isEditing && rdyToSave ? 'negative' : 'hidden'}
                onClick={resetInfo}
                disabled={!rdyToSave}
              >
                Cancel
              </button>
              <p className="image-load-text">
                {!rdyToSave && 'Processing Image...'}
              </p>
            </div>
          </>
        )}
      </section>
    </div>
  );
};
export default UserCard;
