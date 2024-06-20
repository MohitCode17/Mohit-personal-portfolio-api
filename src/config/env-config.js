import { config as conf } from "dotenv";
conf();

const _config = {
  port: process.env.PORT,
  mongodb_uri: process.env.MONGODB_URI,
  cloudinary_cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_api_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_api_secret: process.env.CLOUDINARY_API_SECRET,
  jwt_secret_key: process.env.JWT_SECRET_KEY,
  smtp_host: process.env.SMTP_HOST,
  smtp_port: process.env.SMTP_PORT,
  smtp_service: process.env.SMTP_SERVICE,
  smtp_mail: process.env.SMTP_MAIL,
  smtp_password: process.env.SMTP_PASSWORD,
};

export const config = Object.freeze(_config);
