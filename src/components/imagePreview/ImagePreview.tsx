import './imagePreview.scss';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

type ImagePreviewProps = {
  file: any;
};

const ImagePreview = ({ file }: ImagePreviewProps) => {
  return (
    <div className="imagePreview profile-xl">
      {file ? (
        <img src={URL.createObjectURL(file)} className="profile-xl" />
      ) : (
        <div className="flex-col">
          <CameraAltIcon fontSize="large" />
          <span>No Image</span>
        </div>
      )}
    </div>
  );
};
export default ImagePreview;
