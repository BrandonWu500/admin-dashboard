import './imageUpload.scss';
import DriveFolderUploadIcon from '@mui/icons-material/DriveFolderUpload';

type ImageUploadProps = {
  setFile: any;
};

const ImageUpload = ({ setFile }: ImageUploadProps) => {
  return (
    <div className="imageUpload">
      <label htmlFor="file">
        <span>Image:</span>
        <DriveFolderUploadIcon />
      </label>
      <input
        type="file"
        name="file"
        id="file"
        onChange={(e) => setFile(e.target.files && e.target.files[0])}
      />
    </div>
  );
};
export default ImageUpload;
