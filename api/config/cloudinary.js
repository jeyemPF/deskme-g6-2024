import { v2 as cloudinary } from 'cloudinary';


// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Export the upload method
export const upload = cloudinary.uploader.upload;

// Optionally, you can export the entire cloudinary object if needed
export default cloudinary;
