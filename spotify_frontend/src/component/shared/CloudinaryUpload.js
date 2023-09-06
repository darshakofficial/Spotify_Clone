import { openUploadWidget } from "../../utils/CloudinaryService";
import { cloudinary_cloud_name, cloudinary_upload_preset } from "../../config";

const CloudinaryUpload = ({setUrl, setName}) => {
  const uploadImageWidget = () => {
    let myUploadWidget = openUploadWidget(
      {
        cloudName: cloudinary_cloud_name,
        uploadPreset: cloudinary_upload_preset,
        sources: ["local"],
      },
      function (error, result) {
        if (!error && result.event === "success") {
          //   props.onImageUpload(result.info.public_id);
          setUrl(result.info.secure_url);
          setName(result.info.original_filename);
          console.log(result.info);
        } else {
          if (error) {
            console.log(error);
          }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button
      className="bg-white text-black rounded-full px-4 py-3 font-semibold"
      onClick={uploadImageWidget}
    >
      Select track
    </button>
  );
};

export default CloudinaryUpload;
