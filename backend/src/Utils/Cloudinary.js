import {v2 as Cloudniary} from "cloudinary"
import {config} from 'dotenv'

config();
Cloudniary.config({
cloud_name : process.env.CLOUDNIARY_CLOUD_NAME,
api_key : process.env.CLOUDNIARY_API_KEY,
api_secret : process.env.CLOUDNIARY_API_SECRET,
});

export default Cloudniary;