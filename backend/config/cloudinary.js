import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();
const uploadFileOnCloudinary = async (imagePath) => {
  // console.log(imagePath)
  try {
    // Configuration
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
    });

    // Upload an image
    return await cloudinary.uploader.upload(imagePath, {
      folder: 'Image Store'
    })

  } catch (error) {
    console.log(error)
  }
};

const deletFileFromCloudinary = async (imageId) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET // Click 'View API Keys' above to copy your API secret
  });
  try {
    return await cloudinary.uploader.destroy(imageId, '883625475579292');
  } catch (error) {
    //console.log('my error')
    console.log(error)
  }
}
export { uploadFileOnCloudinary, deletFileFromCloudinary };