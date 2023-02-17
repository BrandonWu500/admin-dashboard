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
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const uploadFile = () => {
      const name = new Date().getTime() + file.name;

      const metadata = {
        contentType: 'image/jpeg',
      };
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file, metadata);

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          /* console.log('Upload is ' + progress + '% done'); */
          setUploadProgress(progress);
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
            default:
              throw new Error();
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;

            // ...

            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;

            default:
              throw new Error();
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setData((prev) => ({ ...prev, img: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
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
        <header className="shadow">
          <h1>{title}</h1>
        </header>
        <section className="content shadow">
          <div className="content-left">
            {file ? (
              <img
                src={URL.createObjectURL(file)}
                alt=""
                className="profile-xl"
              />
            ) : (
              <div className="profile-xl">
                <CameraAltIcon />
                <p>No Image</p>
              </div>
            )}
          </div>
          <div className="content-right">
            <form onSubmit={handleSubmit}>
              <div className="input-group">
                <label htmlFor="file">
                  Image: <DriveFolderUploadIcon />
                </label>
                <input
                  type="file"
                  name=""
                  id="file"
                  onChange={(e) => setFile(e.target.files && e.target.files[0])}
                />
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
                disabled={uploadProgress !== null && uploadProgress < 100}
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};
export default New;
