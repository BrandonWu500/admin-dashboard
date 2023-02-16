import './new.scss';
import Sidebar from '../../components/sidebar/Sidebar';
import Topbar from '../../components/topbar/Topbar';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';
import { useState } from 'react';

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
            <form action="#">
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
                    id={input.label}
                  />
                </div>
              ))}
              <button type="submit" className="positive">
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
