import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { ChangeEvent, useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  setDoc,
} from 'firebase/firestore';
import { storage, auth, db } from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ImagePreview from '../../components/imagePreview/ImagePreview';
import ImageUpload from '../../components/imageUpload/ImageUpload';
import { uploadFile } from '../../helperFunctions/helperFunctions';

interface FormData {
  [key: string]: string;
}

export interface FormInput {
  id: number;
  label: string;
  type: string;
  placeholder?: string;
}

type NewProps = {
  inputs: FormInput[];
  title: string;
};

const New = ({ inputs, title }: NewProps) => {
  const [file, setFile] = useState<any>('');
  const [data, setData] = useState<FormData>({ email: '', password: '' });
  const { email, password } = data;
  const [rdyToSave, setRdyToSave] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    file && uploadFile(file, setData, setRdyToSave);
  }, [file]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (title === 'users') {
      const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if (!email.match(emailRegex)) {
        toast.error('Invalid email');
        throw new Error();
      }
      try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        let obj = { ...data };
        if (!('img' in data)) {
          obj = { ...obj, img: '/images/people/blank.png' };
        }
        await setDoc(doc(db, 'users', res.user.uid), {
          ...obj,
          timestamp: serverTimestamp(),
        });
        navigate(-1);
      } catch (error) {
        console.log(error);
      }
    } else if (title === 'products') {
      try {
        const { email, password, ...rest } = data;
        const docRef = await addDoc(collection(db, title), rest);
        navigate(-1);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const id = e.target.id;
    const val = e.target.value;

    setData({ ...data, [id]: val });
  };

  return (
    <div className="new page">
      <div className="left">
        <Sidebar />
      </div>
      <div className="right">
        <Topbar />
        <div className="container">
          <header className="shadow">
            <h1>{'Add New ' + title.slice(0, -1)}</h1>
          </header>
          <section className="content shadow">
            <div className="content-left">
              <ImagePreview file={file} />
            </div>
            <div className="content-right">
              <form onSubmit={handleSubmit}>
                <div className="input-group">
                  <ImageUpload setFile={setFile} />
                </div>
                {inputs.map((input) => (
                  <div className="input-group" key={input.id}>
                    <label htmlFor={input.label}>{input.label}</label>
                    <input
                      type={input.type}
                      placeholder={input?.placeholder}
                      id={input.label.toLowerCase()}
                      onChange={handleInput}
                      required
                    />
                  </div>
                ))}

                <button
                  type="submit"
                  className="positive"
                  disabled={!rdyToSave}
                >
                  {rdyToSave ? 'Submit' : 'Processing Image...'}
                </button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
export default New;
