/****************************************************/
/*
either load the variables from environement or use default values
environement variables willb be populated by the hosting environment or will be loaded from .env file using dotenv
*/
/****************************************************/
import dotenv from "dotenv";
let clientURLS = [];
let api_url= process.env.api_url;
const environment = process.env.Environment;
let BLOB_READ_WRITE_TOKEN =
  "vercel_blob_rw_nSVZogblPOrEptLk_I8r8UlA2bYNTxrk0vHdU9EuyEqFqKO"; //my account is limite to one free blob so im sharing this between two apps, will need to be changed later

let MULTER_UPLOAD;

if (environment != "production") {
  dotenv.config();
  clientURLS = ["http://localhost:5173"];
  MULTER_UPLOAD = "/tmp";
} else {
  clientURLS = ["https://top-pressing.vercel.app"];
  MULTER_UPLOAD = "/tmp";
}

const secret = process.env.secret || "what is a secret bruh";
const google_client_id= process.env.google_client_id
const google_secret= process.env.google_secret

export {
  secret,
  environment,
  clientURLS,
  BLOB_READ_WRITE_TOKEN,
  MULTER_UPLOAD,
  google_client_id,
  google_secret
};
