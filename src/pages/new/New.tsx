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
  const [data, setData] = useState({ email: '', password: '' });
  const { email, password } = data;
  const [rdyToSave, setRdyToSave] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    file && uploadFile(file, setData, setRdyToSave);
  }, [file]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, 'users', res.user.uid), {
        ...data,
        timestamp: serverTimestamp(),
      });
      navigate(-1);
    } catch (error) {
      console.log(error);
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
            <h1>{title}</h1>
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
